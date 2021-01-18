import { BehaviorSubject, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { BaseGame, IBaseGameSave, IBaseGameState } from '@gamesbyemail/base';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave } from './territory';
import { isOperative, isTerrorist, TeamId } from './team-id';
import { Move, IModMove } from './move';
import { CovertOpToken, Token } from './pieces/token/token';
import { ServerService } from 'projects/server/src/public-api';
import { ETokenType, IInfoState, IOpsState, ITeamState, ITerrState } from './team-state';
import { createToken } from './pieces/token/create-token';
import { annotateGameState } from './state-annotation';
import { IMapPoint } from '../boards/default/board/city-map-data';

export interface IGameOptions {
  dark?: boolean;
}

export interface IGameState extends IBaseGameState<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  teams: [IOpsState, IOpsState, IOpsState, IInfoState, ITerrState];
  moves: Move[];
}

export interface IGameSave extends IBaseGameSave<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  header: string;
}
export class Game extends BaseGame<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  constructor() {
    super();
    this._board = new Board(this);
    this._teams.push(new Team(this, TeamId.SecretAgents), new Team(this, TeamId.BombSquad), new Team(this, TeamId.SpecialForces), new Team(this, TeamId.InformantNetwork), new Team(this, TeamId.Terrorist));
    Object.freeze(this._teams);
  }
  header: string = "";

  private stateAbandon = new Subject();
  abandonState() {
    this.stateAbandon.next(true);
    this.modalOpen.next(false);
  }
  private modalOpen = new BehaviorSubject<boolean>(false);
  public setState(state: IGameState) {
    this.modalOpen
      .pipe(filter(open => !open), take(1))
      .pipe(takeUntil(this.stateAbandon))
      .subscribe(o => {
        this._moveNumber = -1;
        this.board.clear();
        this.board.setState();
        super.setState(state);
        this.header = "";
        const turnTeam = this.findTurnTeam();
        //console.log("turnTeam", turnTeam?.title, turnTeam?.isUs())
        if (turnTeam && turnTeam.isUs()) {
          if (turnTeam.isInformantNetwork())
            this.informantTurn(turnTeam);
          else
            if (turnTeam.city)
              if (turnTeam.isOperative())
                if (turnTeam.isDead())
                  this.beginMeepleMove(turnTeam);
                else {
                  const token = turnTeam.city.findCovertOpsToken(false);
                  if (token)
                    this.resolveCovertOps(turnTeam, token);
                  else {
                    const terrorist = turnTeam.city.findTerrorist();
                    if (turnTeam.hasRolls())
                      if (terrorist && terrorist.hasRolls())
                        this.resolveCombat(turnTeam, [terrorist]);
                      else
                        this.resolveCovertOps(turnTeam, turnTeam.city.findCovertOpsToken()!);
                    else
                      if (terrorist)
                        this.resolveCombat(turnTeam, [terrorist]);
                      else
                        this.beginMeepleMove(turnTeam);
                  }
                }
              else {
                const operatives = turnTeam.city.findOperatives();
                if (turnTeam.hasRolls() || operatives.filter(o => o.isAlive()).length > 0)
                  this.resolveCombat(turnTeam, operatives);
                else
                  this.beginMeepleMove(turnTeam);
              }
            else
              this.beginMeepleMove(turnTeam);
        }
      });
  }
  resolveCovertOps(turnTeam: Team, token: CovertOpToken) {
    this.modalOpen.next(true);
    this.board.openCovertOps(turnTeam, token, () => turnTeam.city.mapData.location)
      .pipe(takeUntil(this.stateAbandon))
      .subscribe(() => {
        this.modalOpen.next(false);
        this.clearRolls();
        const terrorist = turnTeam.city.findTerrorist();
        if (!token.result) {
          turnTeam.workToken(token);
          if (!terrorist || turnTeam.isDead()) {
            this.incrementTurn();
            this.modalOpen.next(true);
            this.board.openCovertOps(turnTeam, token, () => turnTeam.city.mapData.location)
              .pipe(takeUntil(this.stateAbandon))
              .subscribe(() => this.modalOpen.next(false));
          }
          this.saveIt(turnTeam);
        } else {
          this.resolveCombat(turnTeam, [terrorist!]);
        }
      });
  }
  resolveCombat(attacker: Team, defenders: Team[]) {
    this.modalOpen.next(true);
    this.board.openCombat(attacker, defenders, () => attacker.city.mapData.location)
      .pipe(takeUntil(this.stateAbandon))
      .subscribe(opponent => {
        this.modalOpen.next(false);
        this.clearRolls();
        if (opponent) {
          if (attacker.combat(opponent, attacker.city)) {
            if (this.findTeam(TeamId.Terrorist).strength === 0)
              this.setOver();
            else
              this.incrementTurn();
            this.modalOpen.next(true);
            this.board.openCombat(attacker, defenders, () => attacker.city.mapData.location)
              .pipe(takeUntil(this.stateAbandon))
              .subscribe(() => this.modalOpen.next(false));
          }
          this.saveIt(attacker);
        } else {
          if (opponent === false)
            this.restore();
          this.save();
          this.ageAllTokens(true);
          this.beginMeepleMove(attacker);
        }
      });
  }
  clearRolls() {
    this.teams.forEach(t => t.clearRolls());
  }
  beginMeepleMove(team: Team) {
    this.clearRolls();
    const availableMoves = team.city ? team.availableMoves() : this.board.territories;
    availableMoves.forEach(c => c.canSelect = true);
  }
  informantTurn(informant: Team) {
    if (informant.agedMoveNumber === this.moveNumber) {
      this.ageAllTokens();
      this.incrementTurn();
      this.saveIt(informant, true);
      return;
    }
    this.clearRolls();
    this.modalOpen.next(true);
    this.board.openInformantNetwork(informant, () => this.getGeographicCenterOfOperatives())
      .pipe(takeUntil(this.stateAbandon))
      .subscribe(question => {
        this.modalOpen.next(false);
        this.incrementTurn();
        this.saveIt(informant);
      });
  }
  ageAllTokens(terroristReMoving?: boolean) {
    this.getAllTokens().forEach(token => token.increment(terroristReMoving));
    this.findTeam(TeamId.InformantNetwork).agedMoveNumber = this.moveNumber;
  }
  getGeographicCenterOfOperatives() {
    const operatives = this.getOperatives().filter(op => op.city);
    const point: IMapPoint = { x: 0, y: 0 };
    operatives.forEach(op => {
      point.x += op.city.mapData.location.x;
      point.y += op.city.mapData.location.y;
    });
    point.x /= operatives.length;
    point.y /= operatives.length;
    return point;
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
    return territory.canSelect && team && team.isUs && team.isTerrorist() && !territory.hasOperative();
  }
  clearModal(event: MouseEvent) {
    this.board.territories.forEach(c => c.showTokenSelect = false);
  }
  moveHere(city: Territory, tokenType?: ETokenType) {
    const turnTeam = this.findTurnTeam()!;
    if (turnTeam.isTerrorist()) {
      const token = createToken(this.board.game, tokenType || ETokenType.MARKER);
      token.changeTerritory(city);
    }
    if (city === turnTeam.city)
      turnTeam.setStrength(100);
    else
      turnTeam.city = city;
    if (turnTeam.isTerrorist() && city.hasOperative(true))
      this.resolveCombat(turnTeam, city.findOperatives());
    else {
      this.incrementTurn();
      this.saveIt(turnTeam);
    }
  }
  getAllTokens() {
    const tokens: Token[] = [];
    this.board.territories.forEach(c => {
      c.pieces.forEach(p => {
        if (p instanceof Token)
          tokens.push(p);
      });
    });
    return tokens;
  }
  doneSettingUp() {
    return this.moveNumber > 3;
  }
  public incrementTurn() {
    const turnTeam = this.findTurnTeam()!;
    let nextTeam = turnTeam.getNext()!;
    if (nextTeam.isInformantNetwork() && !this.doneSettingUp())
      nextTeam = nextTeam.getNext()!;
    turnTeam.myTurn = false;
    nextTeam.myTurn = true;
  }
  server = new ServerService(this)
  saveIt(team: Team, isAutomatic: boolean = false) {
    if (team.isTerrorist())
      this.ageAllTokens();
    this.server.setState(this.commit(), team, isAutomatic);
    this.setState(this.server.getState());
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

  getTerrorist() {
    return this.teams.find(team => team.isTerrorist())!;
  }
  getOperatives() {
    return this.teams.filter(team => team.isOperative());
  }
  annotateState(gameState: IGameState) {
    return annotateGameState(this, gameState);
  }
}
