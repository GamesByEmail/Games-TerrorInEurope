import { IBaseTerritorySave, BaseMapTerritory, IBaseMapTerritoryData } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { Piece } from './piece';
import { ICityMapData } from '../boards/default/board/city-map-data';
import { CovertOpToken, Token } from './pieces/token/token';
import { ETokenResult, ETokenType, ETokenVisibility, ITeamState } from './team-state';

export interface ITerritorySave extends IBaseTerritorySave<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  canSelect: boolean;
  pieces: Piece[];
}
export type Region = "British" | "Nordic" | "Iberian" | "Franco" | "German" | "Slavic" | "Baltic" | "African" | "Italian" | "Balkan" | "Ukrainian" | "Turk";
export type CitySize = "SMALL" | "MEDIUM" | "LARGE";
export type Transport = "road" | "rail" | "sea" | "air";


export interface IAdjacent {
  road?: string[]
  rail?: string[]
  sea?: string[]
}
export interface ITerritoryData extends IBaseMapTerritoryData {
  region: Region
  size: CitySize
  airport?: boolean
  adjacent: IAdjacent
}

export class Territory extends BaseMapTerritory<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, ITerritoryData, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  public pieces: Piece[] = [];
  public region: Region
  public size: CitySize
  public hasAirport: boolean
  public hasSeaport: boolean
  public adjacent: IAdjacent
  public mapData!: ICityMapData
  public showTokenSelect = false
  public canSelect = false;
  constructor(board: Board, index: number, data: ITerritoryData) {
    super(board, index, data);
    this.region = data.region;
    this.size = data.size;
    this.hasAirport = data.airport || false;
    this.hasSeaport = data.adjacent.sea !== undefined && data.adjacent.sea.length > 0;
    this.adjacent = data.adjacent;
  }
  addPiece(piece: Piece) {
    this.pieces.push(piece);
    this.checkPieces();
  }
  removePiece(piece: Piece) {
    const index = this.pieces.indexOf(piece);
    if (index >= 0) {
      piece.offset = 0;
      this.pieces.splice(index, 1);
      this.checkPieces();
    }
  }
  clear() {
    this.pieces.length = 0;
  }
  checkPieces() {
    this.pieces.sort(function (a, b) { return a.sortOrder() - b.sortOrder(); });
    this.pieces.forEach(p => p.offset = 0);
    const meeples = this.pieces.filter(p => p.isMeeple());
    var start = -0.5 * (meeples.length - 1);
    meeples.forEach(piece => piece.offset = start++);
  }
  clearFlags(team?: Team): void {
    super.clearFlags(team);
    this.canSelect = false;
    this.showTokenSelect = false;
  }
  setState(state: undefined) {
    return undefined;
  }
  getState() {
    return undefined;
  }
  save() {
    super.save();
    this.pieces.forEach(piece => piece.save());
  }
  saving(): ITerritorySave {
    const saving = super.saving();
    saving.canSelect = this.canSelect;
    saving.pieces = this.pieces.slice();
    return saving;
  }
  restore(depth: number) {
    super.restore(depth);
    this.pieces.forEach(piece => piece.restore(depth));
  }
  restoring(saved: ITerritorySave) {
    super.restoring(saved);
    this.canSelect = saved.canSelect;
    this.showTokenSelect = false;
    this.pieces = saved.pieces;
  }
  commit() {
    super.commit();
    this.pieces.forEach(piece => piece.commit());
  }

  beginningMove() {
    super.beginningMove();
    this.canSelect = false;
    this.pieces.forEach(piece => piece.beginningMove());
  }
  isAdjacentToBy(city: Territory, transport: Transport) {
    if (transport === "air")
      return this.hasAirport && city.hasAirport;
    if (transport === "sea")
      return this.adjacent.sea !== undefined && city.adjacent.sea !== undefined && !!this.adjacent.sea.find(sea => city.adjacent.sea!.includes(sea));
    return this.adjacent[transport] !== undefined && this.adjacent[transport]!.includes(city.title);
  }
  allAdjacentBy(transport: Transport) {
    return this.board.territories.filter(c => c !== this && c.isAdjacentToBy(this, transport));
  }
  getInRange(transport: Transport, range: number) {
    let list: Territory[] = [];
    if (range > 0) {
      list.push(this);
      if (transport === "air")
        range = 1;
      while (range > 0) {
        list = list.reduce((a, c) => a.concat(c.allAdjacentBy(transport)), list).filter((c, i, a) => c !== this && a.indexOf(c) === i);
        range--;
      }
    }
    return list;
  }
  allInRange(road: number = 0, rail: number = 0, sea: number = 0, air: number = 0) {
    return this.getInRange("road", road).concat(this.getInRange("rail", rail).concat(this.getInRange("sea", sea).concat(this.getInRange("air", air)))).filter((c, i, a) => a.indexOf(c) === i);
  }
  findOperatives(alive?: boolean) {
    let o = this.board.game.getOperatives().filter(o => o.city === this);
    if (typeof (alive) === "boolean")
      o = o.filter(o => o.isAlive() === alive);
    return o;
  }
  hasOperative(alive?: boolean) {
    return this.findOperatives(alive).length > 0;
  }
  findTerrorist() {
    const t = this.board.game.getTerrorist();
    return t && t.city === this ? t : undefined;
  }
  hasTerrorist() {
    return this.findTerrorist() !== undefined;
  }
  findTokens() {
    return this.pieces.filter((piece): piece is Token => piece instanceof Token);
  }
  findUnexpiredToken() {
    return this.findTokens().find(token => !token.hasExpired());
  }
  findCovertOpsToken(resolved?: boolean) {
    return this.findTokens().find((token): token is CovertOpToken => token.isCovertOps() && (typeof (resolved) !== "boolean" || resolved === (token.result !== ETokenResult.UNDEFINED)));
  }
  looksOccupied() {
    for (let i = 0; i < this.pieces.length; i++)
      if (this.pieces[i].isMeeple())
        return true;
    return false;
  }
  bombable() {
    return this.region !== "African" && this.region !== "Turk";
  }
  click(event: MouseEvent, token?: ETokenType) {
    if (!this.canSelect)
      return;
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.board.territories.forEach(c => c.showTokenSelect = false);
    if (!token && this.board.game.showTokenSelect(this)) {
      this.showTokenSelect = true;
      return;
    }
    this.board.territories.forEach(c => c.canSelect = false);
    this.board.game.moveHere(this, token);
  }
  bombViktoryPoints() {
    if (this.size === "LARGE")
      return 3;
    if (this.size === "MEDIUM")
      return 2;
    return 1;
  }
  recruitStrengthPoints() {
    let amount;
    if (this.size === "LARGE")
      amount = 6;
    if (this.size === "MEDIUM")
      amount = 4;
    amount = 2;
    if (this.region === "African" || this.region === "Turk")
      amount *= 2;
    return amount;
  }
}
