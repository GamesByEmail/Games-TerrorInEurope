import { IBaseTeamSave, BaseTeam } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { maybeControlDamage, operativeDieFill, terroristDieFill } from './cheat';
import { Meeple } from './pieces/meeple/meeple';
import { Trap } from './pieces/token/trap';
import { Bomb } from './pieces/token/bomb';
import { Recruit } from './pieces/token/recruit';
import { ESearchType, ETokenVisibility, IInformantNetworkSearchState, IInformantNetworkState, IOperativeState, ITeamState, ITerroristState, ITokenState } from './team-state';
import { createToken } from './pieces/token/create-token';
import { createMeeple } from './pieces/meeple/create-meeple';
import { CovertOpToken } from './pieces/token/token';

export interface ITeamSave extends IBaseTeamSave<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  city: number
  strength: number
  viktoryPoints: number
  agedMoveNumber: number
  rolls: number[]
}

const operativeOrder = [TeamId.SecretAgents, TeamId.BombSquad, TeamId.SpecialForces];

export class Team extends BaseTeam<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  city!: Territory
  strength!: number
  viktoryPoints: number
  agedMoveNumber: number
  rolls: number[]
  meeple?: Meeple
  search?: IInformantNetworkSearchState;
  constructor(game: Game, id: TeamId) {
    super(game, id);
    this.city = <any>undefined;
    this.setStrength(100);
    this.viktoryPoints = 0;
    this.agedMoveNumber = 0;
    this.rolls = [];
    this.meeple = undefined;
  }
  get title(): string {
    return this.id;
  }
  setState(state: ITeamState) {
    this.myTurn = state.$T === true;
    this.playing = state.$P !== false;
    this.city = <any>undefined;
    this.setStrength(100);
    this.viktoryPoints = 0;
    this.rolls.length = 0;
    this.agedMoveNumber = 0;
    this.meeple = undefined;
    if (this.isSecretAgents() || this.isBombSquad() || this.isSpecialForces()) {
      state = <IOperativeState>state;
      if (state.c >= 0)
        this.city = this.game.board.territories[state.c];
      this.setStrength(state.s)
      if (state.r)
        this.rolls = state.r;
    } else if (this.isInformantNetwork()) {
      state = <IInformantNetworkState>state;
      this.agedMoveNumber = state.a;
      this.search = state.s;
      this.game.searchedRegions.length = 0;
      this.game.searchedCity = -1;
      this.game.searchResult = undefined;
      if (this.search)
        if (this.search.t === ESearchType.CITY) {
          if (this.search.a! < 0)
            this.game.searchedCity = this.search.d[0];
        } else {
          this.game.searchedRegions = this.game.board.territories
            .filter(city => this.search!.d.includes(city.index))
            .map(city => city.region)
            .filter((r, i, a) => a.indexOf(r) === i);
          this.game.searchResult = this.search.a;
        }
    } else {
      state = <ITerroristState>state;
      if (typeof (state.c) === "number" && state.c >= 0)
        this.city = this.game.board.territories[state.c];
      this.viktoryPoints = state.v;
      this.setStrength(state.s)
      if (state.r)
        this.rolls = state.r;
      if (state.t)
        this.addTokens(state.t);
      if (state.$_) {
        if (state.$_.c >= 0)
          this.city = this.game.board.territories[state.$_.c];
        this.addTokens(state.$_.t);
      }
    }
    if (this.city)
      this.addMeeple();
  }
  getState(): ITeamState {
    let state;
    if (this.isSecretAgents() || this.isBombSquad() || this.isSpecialForces())
      state = {
        c: this.city ? this.city.index : -1,
        s: this.strength
      } as IOperativeState;
    else if (this.isInformantNetwork()) {
      state = {
        a: this.agedMoveNumber
      } as IInformantNetworkState;
      if (this.search)
        state.s = {
          t: this.search.t as ESearchType.REGION,
          d: this.search.d.slice(),
          a: <any>this.search.a
        };
    } else {
      state = {
        v: this.viktoryPoints,
        s: this.strength
      } as ITerroristState;
      const pubTokens = this.getTokenStates(false);
      if (pubTokens && pubTokens.length > 0)
        state.t = pubTokens;
      if (this.isUs() && this.city)
        state.$_ = {
          c: this.city.index,
          t: this.getTokenStates(true)
        };
    }
    if (this.rolls.length > 0)
      state.r = this.rolls.slice();
    state.$T = this.myTurn;
    state.$P = this.playing;
    return state;
  }
  addTokens(tokenStates: ITokenState[]) {
    tokenStates.forEach(state => {
      createToken(this.game, state).changeTerritory(this.game.board.territories[state.c]);
    });
  }
  getTokenStates(forPrivate: boolean) {
    return this.game.getAllTokens()
      .filter(t => (t.visibility !== ETokenVisibility.VISIBLE) === forPrivate)
      .map(token => token.getState());
  }
  addMeeple() {
    this.meeple = createMeeple(this.game, this);
    this.meeple.changeTerritory(this.city);
  }
  hasRolls() {
    return this.rolls.length > 0;
  }
  getRolls() {
    return this.hasRolls() ? this.rolls.slice() : undefined;
  }
  clearRolls() {
    this.rolls.length = 0;
  }
  rollDice(count: number = 1) {
    this.rolls = this.game.rollDice(count).sort();
    const roll = this.isOperative() ? operativeDieFill() : terroristDieFill();
    if (typeof (roll) === "number")
      this.rolls.fill(roll);
    return this.rolls;
  }
  saving() {
    const saving = super.saving();
    saving.city = this.city ? this.city.index : -1;
    saving.strength = this.strength;
    saving.viktoryPoints = this.viktoryPoints;
    saving.agedMoveNumber = this.agedMoveNumber;
    saving.rolls = this.rolls.slice();
    return saving;
  }
  restoring(saved: ITeamSave) {
    super.restoring(saved);
    this.city = saved.city < 0 ? undefined! : this.game.board.territories[saved.city];
    this.strength = saved.strength;
    this.viktoryPoints = saved.viktoryPoints;
    this.agedMoveNumber = saved.agedMoveNumber;
    this.rolls = saved.rolls;
  }
  isSecretAgents() {
    return this.id === TeamId.SecretAgents;
  }
  isBombSquad() {
    return this.id === TeamId.BombSquad;
  }
  isSpecialForces() {
    return this.id === TeamId.SpecialForces;
  }
  isInformantNetwork() {
    return this.id === TeamId.InformantNetwork;
  }
  isTerrorist() {
    return this.id === TeamId.Terrorist;
  }
  isOperative() {
    return !this.isTerrorist();
  }
  isAlive() {
    return this.strength > 0;
  }
  isDead() {
    return this.strength === 0;
  }
  findMeeple() {
    return this.game.board.findMeeple(this);
  }
  setStrength(strength: number) {
    const max = this.isTerrorist() ? 12 : 6;
    if (strength < 0)
      this.strength = 0;
    else if (strength > max)
      this.strength = max;
    else
      this.strength = strength;
  }
  alterStrength(delta: number) {
    this.setStrength(this.strength + delta);
  }
  addViktoryPoints(points: number) {
    this.viktoryPoints += points;
  }
  getDefender(operatives: (Team | undefined)[]) {
    const id = operativeOrder[this.rolls[2]];
    return operatives.find(o => o && o.id === id);
  }
  getCombatModifier(opponent: Team, inCity: Territory, asAttacker: boolean) {
    let modifier = 0;
    if (this.id === TeamId.SpecialForces)
      modifier += 2;
    else if (asAttacker)
      modifier++;
    const otherOperatives = inCity.pieces.filter((p): p is Meeple => p.isMeeple() && p.team !== this && p.team !== opponent);
    if (this.isOperative())
      modifier += otherOperatives.filter(o => o.isAlive()).length;
    else {
      modifier += otherOperatives.filter(o => o.isDead()).length;
      if (inCity.region === "African" || inCity.region === "Turk")
        modifier++;
    }
    return modifier;
  }
  private rollForCombat(opponent: Team, inCity: Territory, asAttacker: boolean): number[] {
    this.rollDice(1);
    this.rolls.push(this.getCombatModifier(opponent, inCity, asAttacker));
    if (this.isTerrorist())
      this.rolls.push(operativeOrder.indexOf(opponent.id));
    return this.rolls;
  }

  combat(defender: Team, inCity: Territory) {
    const ourRolls = this.rollForCombat(defender, inCity, true);
    const defenderRolls = defender.rollForCombat(this, inCity, false);
    maybeControlDamage(ourRolls, defenderRolls, this.isOperative());
    const ourTotal = ourRolls[0] + ourRolls[1];
    const defenderTotal = defenderRolls[0] + defenderRolls[1];
    if (ourTotal === defenderTotal)
      return this.isOperative();
    if (ourTotal < defenderTotal) {
      this.alterStrength(ourTotal - defenderTotal);
      return this.isDead();
    }
    defender.alterStrength(defenderTotal - ourTotal);
    if (defender.isAlive())
      return false;
    if (this.isTerrorist() && inCity.hasOperative(true))
      return false;
    return true;
  }
  isTokenOurSpecialty(token: CovertOpToken) {
    return (((token instanceof Trap) && this.isSecretAgents()) ||
      ((token instanceof Bomb) && this.isBombSquad()) ||
      ((token instanceof Recruit) && this.isSpecialForces()));
  }

  tokenRollStrength(token: CovertOpToken) {
    if (this.isTokenOurSpecialty(token))
      return 2;
    return 1;
  }
  workToken(token: CovertOpToken) {
    const rollStrength = this.tokenRollStrength(token);
    if (rollStrength > 0)
      token.worked(rollStrength, this);
  }
  availableMoves(noAir: boolean = false) {
    if (!this.city)
      return this.game.board.territories;
    const airMoves = noAir ? 0 : 1;
    if (this.isTerrorist())
      return this.city.allInRange(1, 2, 1, airMoves).filter(c => !c.findUnexpiredToken());
    if (this.isDead())
      return [this.city];
    let range;
    if (this.isSecretAgents())
      range = this.city.allInRange(2, 2, 2, airMoves);
    else if (this.isBombSquad())
      range = this.city.allInRange(2, 2, 2, airMoves);
    else
      range = this.city.allInRange(1, 2, 1, airMoves);
    range.push(this.city);
    return range;
  }
  mustFly(city: Territory) {
    return !this.availableMoves(true).includes(city);
  }
  get meepleTitle() {
    if (this.isSecretAgents()) return "Secret Agents";
    if (this.isBombSquad()) return "Bomb Squad";
    if (this.isSpecialForces()) return "Special Forces";
    if (this.isTerrorist()) return "Terrorist";
    return "ERROR";
  }
  get meepleId() {
    return "#" + this.id.toString() + (this.isDead() ? "Dead" : "");
  }
}

