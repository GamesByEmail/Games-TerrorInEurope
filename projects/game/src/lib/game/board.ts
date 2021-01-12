import { IBaseBoardSave, BaseMapBoard } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave, ITerritoryData } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { boardData } from './board-data';
import { Meeple } from './pieces/meeple/meeple';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { IMapPoint } from '../boards/default/board/city-map-data';
import { ICovertOpsDialogResult } from '../boards/default/dialogs/covert-ops/covert-ops-dialog.service';
import { ICombatDialogResult } from '../boards/default/dialogs/combat/combat-dialog.service';
import { CovertOpToken } from './pieces/token/token';
import { ITeamState } from './team-state';

export interface IBoardSave extends IBaseBoardSave<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
}

export interface IBoardController {
  openCovertOps(operative: Team | undefined, token: CovertOpToken, pointFnc: () => IMapPoint): Observable<ICovertOpsDialogResult | undefined>
  openCombat(attacker: Team, defenders: Team[], pointFnc: () => IMapPoint): Observable<ICombatDialogResult | undefined>
}

export class Board extends BaseMapBoard<
  Game,
  IGameOptions,
  IGameState,
  IGameSave,
  Board,
  undefined,
  IBoardSave,
  Territory,
  ITerritoryData,
  undefined,
  ITerritorySave,
  Team,
  TeamId,
  ITeamState,
  ITeamSave,
  Move,
  IModMove>  {
  public setController(controller: IBoardController) {
    this._controller.next(controller);
  }
  private _controller = new BehaviorSubject<IBoardController | undefined>(undefined)
  private controller = this._controller.pipe(filter((c): c is IBoardController => c !== undefined))
  sides!: number[]
  constructor(game: Game) {
    super(game, boardData);
  }
  setState(state:undefined){
    this.clearFlags();
  }
  getState(){
    return undefined;
  }
  createTerritory(index: number, data: ITerritoryData): Territory {
    return new Territory(this, index, data);
  }
  clear() {
    this.territories.forEach(t => t.clear());
  }
  checkPieces() {
    this.territories.forEach(t => t.checkPieces());
  }
  findMeeple(team: Team | TeamId) {
    const territories = this.territories;
    for (let t = 0; t < territories.length; t++) {
      const pieces = territories[t].pieces;
      for (let p = 0; p < pieces.length; p++) {
        const piece = pieces[p];
        if (piece.isMeeple() && (piece.team === team || piece.team.id === team))
          return piece as Meeple;
      }
    }
    return;
  }

  openCovertOps(operative: Team, token: CovertOpToken, pointFnc: () => IMapPoint) {
    return this.controller
      .pipe(mergeMap(c => c.openCovertOps(operative, token, pointFnc)));
  }

  openCombat(attacker: Team, defenders: Team[], pointFnc: () => IMapPoint) {
    return this.controller
      .pipe(mergeMap(c => c.openCombat(attacker, defenders, pointFnc)));
  }
}
