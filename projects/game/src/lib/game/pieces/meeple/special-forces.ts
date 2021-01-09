import { CovertOpToken } from '../../piece';
import { TeamId } from '../../team-id';
import { Bomb } from '../token/bomb';
import { Recruit } from '../token/recruit';
import { Token } from '../token/token';
import { Trap } from '../token/trap';
import { Meeple } from './meeple';

export class SpecialForces extends Meeple {
  public static readonly stateChar = "F"
  public static readonly type = "SpecialForces"
  public readonly type = "SpecialForces"
  public readonly title = "Special Forces"
  getState() {
    return SpecialForces.stateChar + super.getState();
  }
  findTeam() {
    return this.game.findTeam(TeamId.SpecialForces);
  }
  sortOrder() {
    return 3 + super.sortOrder();
  }
  show() {
    return true;
  }
  availableMoves() {
    if (this.team.strength === 0)
      return [this.territory!];
    return this.territory!.allInRange(1, 2, 1, 1).concat(this.territory!);
  }
  tokenRollStrength(token: Token) {
    if (token instanceof Recruit)
      return 2;
    if (token instanceof Trap || token instanceof Bomb)
      return 1;
    return 0;
  }
  public workToken(token: CovertOpToken) {
    const rollStrength = this.tokenRollStrength(token);
    if (rollStrength > 0)
      token.worked(rollStrength, this.team);
  }
}
