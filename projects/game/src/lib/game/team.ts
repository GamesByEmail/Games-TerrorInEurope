import { IBaseTeamSave, BaseTeam } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { maybeTie, operativeDieFill, terroristDieFill } from './cheat';
import { Meeple } from './pieces/meeple/meeple';
import { Trap } from './pieces/token/trap';
import { Bomb } from './pieces/token/bomb';
import { Recruit } from './pieces/token/recruit';
import { ETokenVisibility, IInfoState, IOpsState, ITeamState, ITerrState, ITokenState } from './team-state';
import { createToken } from './pieces/token/create-token';
import { createMeeple } from './pieces/meeple/create-meeple';
import { CovertOpToken } from './pieces/token/token';

export interface ITeamSave extends IBaseTeamSave<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  strength: number
}

const operativeOrder = [TeamId.SecretAgents, TeamId.BombSquad, TeamId.SpecialForces];

export class Team extends BaseTeam<Game, IGameOptions, IGameState, IGameSave, Board, undefined, IBoardSave, Territory, undefined, ITerritorySave, Team, TeamId, ITeamState, ITeamSave, Move, IModMove> {
  city!: Territory
  strength!: number
  viktoryPoints: number
  agedMoveNumber: number
  rolls: number[]
  meeple?: Meeple
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
    this.myTurn = state.T === true;
    this.playing = state.P !== false;
    this.city = <any>undefined;
    this.setStrength(100);
    this.viktoryPoints = 0;
    this.rolls.length = 0;
    this.agedMoveNumber = 0;
    this.meeple = undefined;
    if (this.isSecretAgents() || this.isBombSquad() || this.isSpecialForces()) {
      state = <IOpsState>state;
      if (state.c >= 0)
        this.city = this.game.board.territories[state.c];
      this.setStrength(state.s)
      if (state.r)
        this.rolls = state.r;
    } else if (this.isInformantNetwork()) {
      state = <IInfoState>state;
      this.agedMoveNumber = state.a;
    } else {
      state = <ITerrState>state;
      if (typeof (state.c) === "number" && state.c >= 0)
        this.city = this.game.board.territories[state.c];
      this.viktoryPoints = state.v;
      this.setStrength(state.s)
      if (state.r)
        this.rolls = state.r;
      if (state.t)
        this.addTokens(state.t);
      if (state._) {
        if (state._.c >= 0)
          this.city = this.game.board.territories[state._.c];
        this.addTokens(state._.t);
      }
    }
    if (this.city)
      this.addMeeple();
  }
  getState(): ITeamState {
    let state;
    if (this.isSecretAgents() || this.isBombSquad() || this.isSpecialForces()) {
      state = {
        c: this.city ? this.city.index : -1,
        s: this.strength
      } as IOpsState;
      if (this.rolls.length > 0)
        state.r = this.rolls.slice();
    } else if (this.isInformantNetwork())
      state = {
        a: this.agedMoveNumber
      } as IInfoState;
    else {
      state = {
        v: this.viktoryPoints,
        s: this.strength
      } as ITerrState;
      if (this.rolls.length > 0)
        state.r = this.rolls.slice();
      const pubTokens = this.getTokenStates(false);
      if (pubTokens && pubTokens.length > 0)
        state.t = pubTokens;
      if (this.isUs() && this.city)
        state._ = {
          c: this.city.index,
          t: this.getTokenStates(true)
        };
    }
    if (this.myTurn)
      state.T = true;
    if (!this.playing)
      state.P = false;
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
    saving.strength = this.strength;
    return saving;
  }
  restoring(saved: ITeamSave) {
    super.restoring(saved);
    this.strength = saved.strength;
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
  rollForCombat(opponent: Team, inCity: Territory, asAttacker: boolean): number[] {
    this.rollDice(1);
    this.rolls.push(this.getCombatModifier(opponent, inCity, asAttacker));
    maybeTie(this.rolls);
    if (this.isTerrorist())
      this.rolls.push(operativeOrder.indexOf(opponent.id));
    return this.getRolls()!;
  }

  combat(defender: Team, inCity: Territory) {
    const ourRolls = this.rollForCombat(defender, inCity, true);
    const defenderRolls = defender.rollForCombat(this, inCity, false);
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
  availableMoves() {
    if (!this.city)
      return this.game.board.territories;
    if (this.isTerrorist())
      return this.city.allInRange(1, 2, 1, 1).filter(c => !c.findToken(false));
    if (this.isDead())
      return [this.city];
    let range;
    if (this.isSecretAgents())
      range = this.city.allInRange(2, 2, 2, 1);
    else if (this.isBombSquad())
      range = this.city.allInRange(2, 2, 2, 1);
    else
      range = this.city.allInRange(1, 2, 1, 1);
    range.push(this.city);
    return range;
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

