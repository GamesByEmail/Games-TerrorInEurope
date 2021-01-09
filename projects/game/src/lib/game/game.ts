import { BaseGame, IBaseGameSave, IBaseGameState } from '@gamesbyemail/base';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave } from './territory';
import { isOperative, isTerrorist, TeamId } from './team-id';
import { Move, IModMove } from './move';
import { Token, TokenChoice } from './pieces/token/token';
import { SecretAgents } from './pieces/meeple/secret-agents';
import { BombSquad } from './pieces/meeple/bomb-squad';
import { SpecialForces } from './pieces/meeple/special-forces';
import { Terrorist } from './pieces/meeple/terrorist';
import { Trap } from './pieces/token/trap';
import { Recruit } from './pieces/token/recruit';
import { Bomb } from './pieces/token/bomb';
import { None } from './pieces/token/none';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Meeple } from './pieces/meeple/meeple';
import { CovertOpToken } from './piece';

export interface IGameOptions {
  dark?: boolean;
}
export interface IGameState extends IBaseGameState<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  board: string;
  teams: string[];
  moves: Move[];
}

export interface IGameSave extends IBaseGameSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  header: string;
}
export class Game extends BaseGame<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  constructor() {
    super();
    this._board = new Board(this);
    this._teams.push(new Team(this, TeamId.SecretAgents), new Team(this, TeamId.BombSquad), new Team(this, TeamId.SpecialForces), new Team(this, TeamId.InformantNetwork), new Team(this, TeamId.Terrorist));
    Object.freeze(this._teams);
  }
  header: string = "";

  private modalOpen = new BehaviorSubject<boolean>(false);
  public setState(state: IGameState) {
    this.modalOpen
      .pipe(filter(open => !open), take(1))
      .subscribe(o => {
        super.setState(state);
        this.board.checkPieces();
        this.header = "";
        const turnTeam = this.findTurnTeam();
        if (turnTeam && turnTeam.isUs()) {
          const meeple = turnTeam.findMeeple();
          if (meeple)
            if (meeple.isOperative())
              if (turnTeam.strength === 0)
                this.beginMeepleMove(meeple);
              else {
                const token = meeple.territory!.findToken<CovertOpToken>(undefined, undefined, false);
                const terrorist = meeple.territory!.findTerrorist();
                if (token) {
                  this.modalOpen.next(true);
                  this.board.openCovertOps(meeple, token, () => meeple.territory!.mapData.location)
                    .subscribe(() => {
                      this.modalOpen.next(false);
                      meeple.workToken(token);
                      if (!terrorist || turnTeam.strength === 0) {
                        this.board.game.incrementTurn();
                        this.modalOpen.next(true);
                        this.board.openCovertOps(meeple, token, () => meeple.territory!.mapData.location)
                          .subscribe(() => {
                            this.modalOpen.next(false);
                          });
                      }
                      this.saveIt();
                    });
                }
                else
                  if (turnTeam.hasRolls())
                    if (terrorist && terrorist.team.hasRolls()) {
                    } else {
                      this.modalOpen.next(true);
                      this.board.openCovertOps(meeple, meeple.territory!.findToken<CovertOpToken>()!, () => meeple.territory!.mapData.location)
                        .subscribe(() => {
                          turnTeam.clearRolls();
                          this.modalOpen.next(true);
                          this.board.openCombat(meeple, terrorist!, () => meeple.territory!.mapData.location)
                            .subscribe(opponent => {
                              this.modalOpen.next(false);
                              alert(1);
                              if (meeple.combat(opponent as Terrorist)) {
                                this.board.game.incrementTurn();
                                this.modalOpen.next(true);
                                this.board.openCombat(meeple, terrorist!, () => meeple.territory!.mapData.location)
                                  .subscribe(() => {
                                    this.modalOpen.next(false);
                                  });
                              }
                              this.saveIt();
                            });
                        });
                    }
                  else
                    if (terrorist) {
                      this.modalOpen.next(true);
                      this.board.openCombat(meeple, terrorist, () => meeple.territory!.mapData.location)
                        .subscribe(opponent => {
                          this.modalOpen.next(false);
                          alert(2);
                          if (meeple.combat(opponent as Terrorist)) {
                            this.board.game.incrementTurn();
                            this.modalOpen.next(true);
                            this.board.openCombat(meeple, terrorist, () => meeple.territory!.mapData.location)
                              .subscribe(() => {
                                this.modalOpen.next(false);
                              });
                          }
                          this.saveIt();
                        });
                    } else
                      this.beginMeepleMove(meeple);
              }
            else {
              const operatives = meeple.territory!.findOperatives(true);
              if (operatives.length > 0) {

              } else
                this.beginMeepleMove(meeple);
            }
          else
            this.beginMeepleMove(meeple);
        }
      });
  }
  beginMeepleMove(meeple?: Meeple) {
    const availableMoves = meeple ? meeple.availableMoves() : this.board.territories;
    availableMoves.forEach(c => c.canSelect = true);
  }
  saving(): IGameSave {
    const saved = super.saving();
    saved.header = this.header;
    return saved;
  }
  restoring(saved: IGameSave) {
    super.restoring(saved);
    this.header = saved.header;
  }
  beginningMove() {
    super.beginningMove();
    this.header = "";
  }
  showTokenSelect(territory: Territory) {
    const team = this.findTurnTeam();
    return territory.canSelect && team && team.isUs && team.id === TeamId.Terrorist && !territory.hasOperative();
  }
  clearModal(event: MouseEvent) {
    this.board.territories.forEach(c => c.showTokenSelect = false);
  }
  moveHere(territory: Territory, tokenChoice?: TokenChoice) {
    const turnTeam = this.board.game.findTurnTeam()!;
    if (turnTeam.id === TeamId.Terrorist) {
      let token: Token;
      switch (tokenChoice) {
        case "TRAP":
          token = (new Trap(this.board.game, ""));
          break;
        case "RECRUIT":
          token = (new Recruit(this.board.game, ""));
          break;
        case "BOMB":
          token = (new Bomb(this.board.game, ""));
          break;
        default:
          token = (new None(this.board.game, ""));
          break;
      }
      token.changeTerritory(territory);
    }
    let meeple = turnTeam.findMeeple();
    if (!meeple)
      switch (turnTeam.id) {
        case TeamId.SecretAgents:
          meeple = (new SecretAgents(this.board.game, ""));
          break;
        case TeamId.BombSquad:
          meeple = (new BombSquad(this.board.game, ""));
          break;
        case TeamId.SpecialForces:
          meeple = (new SpecialForces(this.board.game, ""));
          break;
        case TeamId.Terrorist:
          meeple = (new Terrorist(this.board.game, ""));
          break;
      }
    meeple = meeple!;
    if (meeple.isOperative()) {
      if (territory === meeple.territory)
        if (meeple.team.strength === 0 && meeple.territory.hasTerrorist())
          meeple.territory.findToken()!.revealed = "EXISTANCE";
        else
          meeple.team.setStrength(100);
      else
        meeple.changeTerritory(territory);
      if (meeple.team.strength === 0 || !territory.findToken<CovertOpToken>(undefined, undefined, false))
        this.board.game.incrementTurn();
    } else {
      meeple.changeTerritory(territory);
      if (!territory.hasOperative(true))
        this.board.game.incrementTurn();
    }
    this.saveIt();
  }
  ageAllTokens() {
    this.board.territories.forEach(c => {
      c.pieces.forEach(p => {
        if (p instanceof Token)
          p.incrementAge();
      });
    });
  }
  public incrementTurn() {
    const turnTeam = this.findTurnTeam()!;
    let nextTeam = turnTeam.getNext()!;
    if (nextTeam.id === TeamId.InformantNetwork && !this.board.findMeeple(TeamId.Terrorist))
      nextTeam = nextTeam.getNext()!;
    if (nextTeam.id === TeamId.InformantNetwork)
      nextTeam = nextTeam.getNext()!;
    turnTeam.myTurn = false;
    nextTeam.myTurn = true;
    if (nextTeam.isTerrorist())
      this.ageAllTokens();
  }
  saveIt() {
    const state = this.commit();
    navigator.clipboard.writeText(JSON.stringify(state, null, 2) + "\n");
    this.setState(state);
  }

  earnedRankPoints(teamId: TeamId | Team) {
    const operativesPoints = [26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 0];
    const terroristPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19, 20, 21, 26];
    const viktoryPoints = this.findTeam(TeamId.Terrorist).viktoryPoints;
    if (teamId instanceof Team)
      teamId = teamId.id;
    if (isOperative(teamId))
      return operativesPoints[Math.max(viktoryPoints, operativesPoints.length - 1)];
    if (isTerrorist(teamId))
      return terroristPoints[Math.max(viktoryPoints, terroristPoints.length - 1)];
    return 0;
  }

}
