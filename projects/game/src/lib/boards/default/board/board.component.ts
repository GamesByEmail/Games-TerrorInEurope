import { Component, Input, ElementRef, ViewChild, AfterViewInit, ViewContainerRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { BoardService } from '@gamesbyemail/base';
import { Territory } from '../../../game/territory';
import { Game } from '../../../game/game';
import { fromEvent, Subscription, Observable, Subject, merge } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Rectangle2D } from '@packageforge/geometry2d';
import { cityMapData, IMapPoint } from './city-map-data';
import { CovertOpsDialogService } from '../dialogs/covert-ops/covert-ops-dialog.service';
import { CombatDialogService } from '../dialogs/combat/combat-dialog.service';
import { Team } from '../../../game/team';
import { CovertOpToken, Token } from '../../../game/pieces/token/token';
import { ETokenResult, ETokenType } from '../../../game/team-state';
import { InformantNetworkDialogService } from '../dialogs/informant-network/informant-network-dialog.service';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-default-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements AfterViewInit {
  game!: Game;
  @Input("game") set _game(value: Game) {
    this.game = value;
    this.game.board.territories.forEach(territory => {
      territory.mapData = cityMapData[territory.title];
      if (!territory.mapData.titles[0].title)
        territory.mapData.titles[0].title = territory.title;
      if (territory.hasAirport)
        territory.mapData.type = "#AirMetropolis";
      else if (territory.size === "MEDIUM" || territory.size === "LARGE")
        if (territory.hasSeaport)
          territory.mapData.type = "#SeaMetropolis";
        else
          territory.mapData.type = "#Metropolis";
      else
        if (territory.hasSeaport)
          territory.mapData.type = "#SeaCity";
        else
          territory.mapData.type = "#City";

      if (territory.size === "LARGE")
        territory.mapData.titleClass = "metroB";
      else if (territory.size === "MEDIUM")
        territory.mapData.titleClass = "metro";
      else
        territory.mapData.titleClass = "";
    });
  }
  @ViewChild('boardArea') boardArea!: ElementRef<SVGElement>;
  @ViewChild('dialogArea', { read: ViewContainerRef }) dialogArea!: ViewContainerRef;
  @ViewChild('dialogOverlay', { read: ElementRef }) dialogOverlay!: ElementRef<SVGRectElement>;
  @ViewChild('pieceLibrary') pieceLibrary!: any;
  @ViewChild('mover', { read: ElementRef }) mover!: ElementRef<SVGGElement>;

  mousemove: Observable<MouseEvent> = <any>fromEvent(document, 'mousemove');
  mouseup: Observable<any> = fromEvent(document, 'mouseup').pipe(map(() => undefined));
  territoryUp: Subject<Territory> = new Subject();
  viewBox: Rectangle2D = new Rectangle2D(0, 0, 100, 100);

  constructor(
    private cd: ChangeDetectorRef,
    private boardService: BoardService,
    private covertOpsDialogService: CovertOpsDialogService,
    private combatDialogService: CombatDialogService,
    private informantNetworkDialogService: InformantNetworkDialogService,
    element: ElementRef,
    _ngZone: NgZone

  ) {
    _ngZone.runOutsideAngular(() => {
      merge(
        fromEvent<MouseEvent>(element.nativeElement, "mousemove"),
        fromEvent<MouseEvent>(element.nativeElement, "mouseout"),
        fromEvent<MouseEvent>(element.nativeElement, "mouseover")
      )
        .subscribe(event => {
          if (this.mover && this.mover.nativeElement) {
            if (event.type === "mouseout")
              this.mover.nativeElement.style.display = "none";
            this.mover.nativeElement.setAttribute("transform", "translate(" + event.offsetX + " " + event.offsetY + ")");
            if (event.type !== "mouseout")
              this.mover.nativeElement.style.display = "";
          }
        });
    });
  }
  subscription!: Subscription;
  overlayPoly!: string;
  ngAfterViewInit() {
    this.game.board.setController(this);
    this.cd.detectChanges();
  }
  digest() {
    console.log("digest");
    return "";
  }
  openCovertOps(operative: Team | undefined, token: CovertOpToken, pointFnc: () => IMapPoint) {
    const point = pointFnc();
    this.dialogArea.element.nativeElement.parentNode.setAttribute("transform", point ? "translate(" + point.x + " " + point.y + ")" : null);
    let ref = this.covertOpsDialogService.open(this.dialogArea, { operative: operative, token: token }, this.dialogOverlay);
    return ref.afterClosed().pipe(finalize(() => ref.close()));
  }
  openCombat(attacker: Team, defenders: Team[], pointFnc: () => IMapPoint) {
    const point = pointFnc();
    this.dialogArea.element.nativeElement.parentNode.setAttribute("transform", point ? "translate(" + point.x + " " + point.y + ")" : null);
    let ref = this.combatDialogService.open(this.dialogArea, { attacker: attacker, defenders: defenders }, this.dialogOverlay);
    return ref.afterClosed().pipe(finalize(() => ref.close()));
  }
  openInformantNetwork(informant: Team, regionSearchable: boolean, allSearchable: boolean, pointFnc: () => IMapPoint) {
    const point = pointFnc();
    this.dialogArea.element.nativeElement.parentNode.setAttribute("transform", point ? "translate(" + point.x + " " + point.y + ")" : null);
    let ref = this.informantNetworkDialogService.open(this.dialogArea, { informant: informant, regionSearchable: regionSearchable, allSearchable: allSearchable }, this.dialogOverlay);
    return ref.afterClosed().pipe(finalize(() => ref.close()));
  }
  tokenClass(token: Token) {
    return { aged: token.result === ETokenResult.AGED, won: token.result === ETokenResult.WON, lost: token.result === ETokenResult.LOST };
  }
  moveSearchableLands(allLands: any, searchableLands: any) {
    if ((allLands instanceof SVGGElement) && (searchableLands instanceof SVGGElement)) {
      allLands.querySelectorAll(".lands.searchable").forEach(s => searchableLands.appendChild(s));
      searchableLands.querySelectorAll(".lands:not(.searchable)").forEach(u => allLands.appendChild(u));
    }
    return this.game.searchableRegions.includes("ALL") ? "allSearchable" : "";
  }
  ETokenType = ETokenType
}
