import { StateStore } from '@gamesbyemail/base';
import { Game } from './game';
import { Territory } from './territory';
import { Team } from './team';
import { Meeple, Operative } from './pieces/meeple/meeple';
import { Terrorist } from './pieces/meeple/terrorist';
import { ITokenState } from './team-state';
import { Token } from './pieces/token/token';

export interface IPieceSave {
  territory: number;
}
export abstract class Piece {

  abstract readonly type: string;
  abstract setState(state: ITokenState|Team):void;
  abstract getState(): ITokenState|undefined;
  abstract sortOrder(): number;
  abstract svgId(): string;

  public get game(): Game {
    return this._game;
  }
  protected _team!: Team;
  public get team(): Team {
    return this._team;
  }
  private _territory!: Territory;
  public get territory(): Territory {
    return this._territory;
  }
  public set territory(value: Territory) {
    this._territory = value;
  }
  private stateStore = new StateStore<IPieceSave>();
  public showCheck = false;
  public offset = 0;
  constructor(private _game: Game, state: ITokenState|Team) {
    this.setState(state);
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
    const saved = this.stateStore.pop(depth)!;
    this.restoring(saved);
  }
  restoring(saved: IPieceSave) {
    this.territory = this.team.game.board.territories[saved.territory];
  }
  commit() {
    this.stateStore.commit();
  }
  public isMeeple(): this is Meeple {
    return this.type === "SecretAgents" || this.type === "BombSquad" || this.type === "SpecialForces" || this.type === "Terrorist";
  }
  public isToken(): this is Token {
    return this.type === "Trap" || this.type === "Recruit" || this.type === "Bomb" || this.type === "None" || this.type === "Unknown";
  }
  public isOperative(): this is Operative {
    return this.type === "SecretAgents" || this.type === "BombSquad" || this.type === "SpecialForces";
  }
  public isTerrorist(): this is Terrorist {
    return this.type === "Terrorist";
  }
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
  async attemptMove(toTerritory: Territory) {
    return true;
  }
  changeTerritory(toTerritory: Territory): void {
    if (this.territory)
      this.territory.removePiece(this);
    this.territory = toTerritory;
    if (this.territory)
      this.territory.addPiece(this);
  }
  isUs(team?: Team): boolean {
    return team ? this.team === team : this.team.isUs();
  }
  beginningMove() {
  }
}
