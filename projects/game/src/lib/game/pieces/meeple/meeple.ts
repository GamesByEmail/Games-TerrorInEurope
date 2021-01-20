import { Piece } from '../../piece';
import { Team } from '../../team';
import { BombSquad } from './bomb-squad';
import { SecretAgents } from './secret-agents';
import { SpecialForces } from './special-forces';

export type Operative = SecretAgents | BombSquad | SpecialForces;

export abstract class Meeple extends Piece {
  setState(team: Team) {
    this._team = team;
  }
  getState() {
    return undefined;
  }
  svgId() {
    return this.team.meepleId;
  }
  sortOrder(): number {
    return (this.isDead() ? 0 : 10) + (this.team.isUs() ? 100 : 0) + (this.team.myTurn ? 1000 : 0);
  }
  isAlive() {
    return this.team.isAlive();
  }
  isDead() {
    return this.team.isDead();
  }
}