import { Component, Input, ElementRef, ViewChild, AfterViewInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition, sequence } from '@angular/animations';

import { BoardService } from '@gamesbyemail/base';

import { Territory } from '../../../game/territory';
import { Game } from '../../../game/game';
import { fromEvent, Subscription, Observable, Subject, race } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { Point2D, Rectangle2D } from '@packageforge/geometry2d';
import { Piece } from '../../../game/piece';
import { cityMapData, IMapPoint } from './city-map-data';
import { CovertOpsDialogService } from '../dialogs/covert-ops/covert-ops-dialog.service';
import { CombatDialogService } from '../dialogs/combat/combat-dialog.service';
import { Team } from '../../../game/team';
import { CovertOpToken, Token } from '../../../game/pieces/token/token';
import { ETokenResult, ETokenType } from '../../../game/team-state';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-default-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('showCheck', [
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', sequence([
        animate("0.05s", style({ opacity: 0 })),
        animate("0.15s", style({ opacity: 0 })),
        animate("0.05s", style({ opacity: 1 })),
        animate("0.15s", style({ opacity: 1 })),
        animate("0.05s", style({ opacity: 0 })),
        animate("0.15s", style({ opacity: 0 })),
        animate("0.05s", style({ opacity: 1 })),
        animate("0.15s", style({ opacity: 1 })),
        animate("0.05s", style({ opacity: 0 })),
        animate("0.15s", style({ opacity: 0 })),
        animate("0.05s", style({ opacity: 1 }))
      ]))
    ])
  ]
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
  @ViewChild('dialogOverlay', { read: ElementRef }) dialogOverlay!: ElementRef;
  @ViewChild('pieceLibrary') pieceLibrary!: any;

  mousemove: Observable<MouseEvent> = <any>fromEvent(document, 'mousemove');
  mouseup: Observable<any> = fromEvent(document, 'mouseup').pipe(map(() => undefined));
  territoryUp: Subject<Territory> = new Subject();

  viewBox: Rectangle2D = new Rectangle2D(0, 0, 100, 100);
  constructor(private cd: ChangeDetectorRef, private boardService: BoardService,
    private covertOpsDialogService: CovertOpsDialogService,
    private combatDialogService: CombatDialogService
  ) {
  }
  subscription!: Subscription;
  overlayPoly!: string;
  ngAfterViewInit() {
    this.game.board.setController(this);
    this.cd.detectChanges();
  }
  get perspectiveTeam() {
    return this.game.findTeam(this.game.perspective);
  }
  get opposingTeam() {
    return this.perspectiveTeam.getNext(true)!;
  }
  boardTransform() {
    let transform = "";
    transform += " translate(" + (-this.viewBox.x) + " " + (-this.viewBox.y) + ")";
    return transform;
  }
  territoryTransform(territory: Territory): string {
    let transform = "";
    transform += " translate(" + 0 + " " + 0 + ")";
    return transform;
  };
  pieceTransform(piece: Piece) {
    let transform = "";
    //    const pieceOffset=cityData[piece.type];
    //   if (pieceOffset)
    //     transform += " translate(" + (pieceOffset.origin.x+pieceOffset.offset.x*piece.offset) + " " + (pieceOffset.origin.y+pieceOffset.offset.y*piece.offset) + ")";
    return transform;
  }
  openCovertOps(operative: Team | undefined, token: CovertOpToken, pointFnc: () => IMapPoint) {
    const point = pointFnc();
    this.dialogArea.element.nativeElement.parentNode.setAttribute("transform", point ? "translate(" + point.x + " " + point.y + ")" : null);
    let ref = this.covertOpsDialogService.open(this.dialogArea, { operative: operative, token: token }, this.dialogOverlay);
    return ref.afterClosed();//.pipe(finalize(()=>console.log("closezit:"+ref.close())));
  }
  openCombat(attacker: Team, defenders: Team[], pointFnc: () => IMapPoint) {
    const point = pointFnc();
    this.dialogArea.element.nativeElement.parentNode.setAttribute("transform", point ? "translate(" + point.x + " " + point.y + ")" : null);
    let ref = this.combatDialogService.open(this.dialogArea, { attacker: attacker, defenders: defenders }, this.dialogOverlay);
    return ref.afterClosed();//.pipe(finalize(()=>console.log("closezit:"+ref.close())));
  }
  tokenClass(token: Token) {
    return { aged: token.result === ETokenResult.AGED, won: token.result === ETokenResult.WON, lost: token.result === ETokenResult.LOST };
  }
  ETokenType=ETokenType
}
