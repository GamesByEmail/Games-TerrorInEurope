import { IProjectedEntity } from '@packageforge/template-projection';
import { IBindableTarget, StateStore } from '@gamesbyemail/base';
import { Game } from './game';
import { Territory } from './territory';
import { Team } from './team';
import { IPieceKey } from './i-piece-key';
import { ElementRef } from '@angular/core';
import { Rectangle2D } from '@packageforge/geometry2d';
import { TokenResult } from './pieces/token/token';
import { Meeple } from './pieces/meeple/meeple';
import { SecretAgents } from './pieces/meeple/secret-agents';
import { BombSquad } from './pieces/meeple/bomb-squad';
import { SpecialForces } from './pieces/meeple/special-forces';
import { Terrorist } from './pieces/meeple/terrorist';
import { Trap } from './pieces/token/trap';
import { Recruit } from './pieces/token/recruit';
import { Bomb } from './pieces/token/bomb';

export interface IPieceSave {
  territory: number;
}
export type Operative = SecretAgents | BombSquad | SpecialForces;
export type CovertOpToken = Trap | Recruit | Bomb;

export abstract class Piece implements IProjectedEntity, IBindableTarget {
  public get game(): Game {
    return this._game;
  }
  private _team: Team;
  public get team(): Team {
    return this._team;
  }
  private _territory: Territory | undefined;
  public get territory(): Territory | undefined {
    return this._territory;
  }
  public set territory(value: Territory | undefined) {
    if (this.elementRef)
      this.lastClientRect = new Rectangle2D(this.elementRef.nativeElement.getBoundingClientRect());
    this._territory = value;
  }
  public templateKey: IPieceKey;
  private stateStore = new StateStore<IPieceSave>();
  public showCheck = false;
  public offset = 0;
  constructor(private _game: Game, state: string) {
    this._team = this.findTeam();
    this.templateKey = { type: <any>(this.constructor.name) };
    this.setState(state);
  }
  elementRef: ElementRef<SVGElement> | undefined;
  private lastClientRect: Rectangle2D | undefined;
  bindElement(elementRef: ElementRef<SVGElement>): Rectangle2D | undefined {
    if (this.elementRef && this.elementRef !== elementRef)
      this.unbindElement(this.elementRef);
    this.elementRef = elementRef;
    const r = this.lastClientRect;
    this.lastClientRect = undefined;
    return r;
  }
  unbindElement(elementRef: ElementRef<SVGElement>): void {
    if (this.elementRef === elementRef)
      this.elementRef = undefined;
  }
  getTemplateKey(key?: IPieceKey): IPieceKey {
    return this.templateKey;
  }
  canMove(): boolean {
    return this.team.myTurn;
  }
  save(): IPieceSave {
    const saved = this.saving();
    this.stateStore.push(saved);
    return saved;
  }
  saving(): IPieceSave {
    return {
      territory: this.territory ? this.territory.index : -1
    };
  }
  restore(depth: number) {
    const saved = this.stateStore.pop(depth);
    this.restoring(saved);
  }
  restoring(saved: IPieceSave | undefined) {
    this.territory = saved && saved.territory >= 0 ? this.team.game.board.territories[saved.territory] : undefined;
  }
  commit() {
    this.stateStore.commit();
  }
  result: TokenResult = "";
  age: number = 0;
  abstract show(): boolean;
  abstract sortOrder(): number;
  public isMeeple(): this is Meeple {
    return this.type === "SecretAgents" || this.type === "BombSquad" || this.type === "SpecialForces" || this.type === "Terrorist";
  }
  public isToken(): boolean {
    return this.type === "Trap" || this.type === "Recruit" || this.type === "Bomb" || this.type === "None";
  }
  public isOperative(): this is Operative {
    return this.type === "SecretAgents" || this.type === "BombSquad" || this.type === "SpecialForces";
  }
  public isTerrorist(): this is Terrorist {
    return this.type === "Terrorist";
  }
  abstract setState(state: string): string;
  abstract getState(): string;
  abstract findTeam(): Team;
  abstract readonly type: string;
  makeMove(toTerritory: Territory, logIt?: boolean): boolean {
    this.changeTerritory(toTerritory);
    return true;
  }
  completeMove(fromTerritory: Territory): Promise<boolean> {
    return Promise.resolve(true);
  }
  isOurTurn() {
    return this.team.myTurn;
  }
  async attemptMove(toTerritory: Territory | undefined) {
    return true;
  }
  changeTerritory(toTerritory: Territory | undefined): void {
    if (this.territory)
      this.territory.removePiece(this);
    this.territory = toTerritory;
    if (this.territory)
      this.territory.addPiece(this);
  }
  isUs(team?: Team): boolean {
    return team ? this.team === team : this.team.isUs();
  }
  replaceWith(replacement: Piece) {
    const territory = this.territory;
    this.changeTerritory(undefined);
    replacement.changeTerritory(territory);
    replacement.lastClientRect = this.lastClientRect;
  }
  beginningMove() {
  }
}
