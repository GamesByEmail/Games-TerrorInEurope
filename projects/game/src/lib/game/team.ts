import { IBaseTeamSave, BaseTeam } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { TEAM_STATE_DELIMETER } from './delimeter';
import { Operative } from './piece';
import { operativeDieFill, terroristDieFill } from './cheat';

export interface ITeamSave extends IBaseTeamSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  strength: number
}

const operativeOrder = [TeamId.SecretAgents, TeamId.BombSquad, TeamId.SpecialForces];

export class Team extends BaseTeam<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  strength!: number
  viktoryPoints: number
  rolls: number[] = []
  constructor(game: Game, id: TeamId) {
    super(game, id);
    this.setStrength(100);
    this.viktoryPoints = 0;
  }
  get title(): string {
    return this.id;
  }
  setState(state: string): string {
    state = super.setState(state);
    const values = state.split(TEAM_STATE_DELIMETER).filter(r => r.length > 0).map(r => parseInt(r));
    if (values.length > 0)
      this.strength = values.shift()!;
    else
      this.setStrength(100);
    if (this.id === TeamId.Terrorist && values.length > 0)
      this.viktoryPoints = values.shift()!;
    else
      this.viktoryPoints = 0;
    this.rolls = values;
    return "";
  }
  getState(): string {
    let state = super.getState();
    state += this.strength;
    if (this.viktoryPoints > 0)
      state += TEAM_STATE_DELIMETER + this.viktoryPoints;
    if (this.rolls.length > 0)
      state += TEAM_STATE_DELIMETER + this.rolls.join(TEAM_STATE_DELIMETER);
    return state;
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
  isTerrorist() {
    return this.id === TeamId.Terrorist;
  }
  isOperative() {
    return this.id !== TeamId.Terrorist;
  }
  findMeeple() {
    return this.game.board.findMeeple(this);
  }
  setStrength(strength: number) {
    const max = this.id === TeamId.Terrorist ? 12 : 6;
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
  getDefender(operatives: Operative[]) {
    const id = operativeOrder[this.rolls[2]];
    return operatives.find(o => o.team.id === id);
  }
  getCombatModifier(opponent: Team, inCity: Territory, asAttacker: boolean) {
    let modifier = 0;
    if (this.id === TeamId.SpecialForces)
      modifier += 2;
    else if (asAttacker)
      modifier++;
    const otherOperatives = inCity.pieces.filter(p => p.isMeeple() && p.team !== this && p.team !== opponent);
    if (this.isOperative())
      modifier += otherOperatives.filter(o => o.team.strength > 0).length;
    else {
      modifier += otherOperatives.filter(o => o.team.strength === 0).length;
      if (inCity.region === "African" || inCity.region === "Turk")
        modifier++;
    }
    return modifier;
  }
  rollForCombat(opponent: Team, inCity: Territory, asAttacker: boolean): number[] {
    this.rollDice(1);
    this.rolls.push(this.getCombatModifier(opponent, inCity, asAttacker));
    if (this.isTerrorist())
      this.rolls.push(operativeOrder.indexOf(opponent.id));
    return this.getRolls()!;
  }
}

