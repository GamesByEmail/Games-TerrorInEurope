import { IBaseBoardSave, BaseMapBoard } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave, ITerritoryData } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { CovertOpToken, Operative, Piece } from './piece';
import { createPiece } from './create-piece';
import { boardData } from './board-data';
import { Meeple } from './pieces/meeple/meeple';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { IMapPoint } from '../boards/default/board/city-map-data';
import { Terrorist } from './pieces/meeple/terrorist';
import { ICovertOpsDialogResult } from '../boards/default/dialogs/covert-ops/covert-ops-dialog.service';
import { ICombatDialogResult } from '../boards/default/dialogs/combat/combat-dialog.service';

export interface IBoardSave extends IBaseBoardSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
}

export interface IBoardController {
  openCovertOps(operative: Operative | undefined, token: CovertOpToken, pointFnc: () => IMapPoint): Observable<ICovertOpsDialogResult | undefined>
  openCombat(attacker: Operative, defender: Terrorist, pointFnc: () => IMapPoint): Observable<ICombatDialogResult | undefined>
  openCombat(attacker: Terrorist, defenders: Operative[], pointFnc: () => IMapPoint): Observable<ICombatDialogResult | undefined>
}

export class Board extends BaseMapBoard<
  Game,
  IGameOptions,
  IGameState,
  IGameSave,
  Board,
  IBoardSave,
  Territory,
  ITerritoryData,
  ITerritorySave,
  Team,
  TeamId,
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
  createTerritory(index: number, data: ITerritoryData): Territory {
    return new Territory(this, index, data);
  }
  createPiece(state: string): Piece {
    return createPiece(this.game, state);
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

  openCovertOps(operative: Operative, token: CovertOpToken, pointFnc: () => IMapPoint) {
    return this.controller
      .pipe(mergeMap(c => c.openCovertOps(operative, token, pointFnc)));
  }

  openCombat(attacker: Operative, defender: Terrorist, pointFnc: () => IMapPoint): Observable<ICombatDialogResult | undefined>
  openCombat(attacker: Terrorist, defenders: Operative[], pointFnc: () => IMapPoint): Observable<ICombatDialogResult | undefined>
  openCombat(attacker: Operative | Terrorist, defender: Terrorist | Operative[], pointFnc: () => IMapPoint) {
    return this.controller
      .pipe(mergeMap(c => c.openCombat(<Operative>attacker, <Terrorist>defender, pointFnc)));
  }
}
