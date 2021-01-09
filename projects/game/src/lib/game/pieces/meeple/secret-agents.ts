import { CovertOpToken } from '../../piece';
import { TeamId } from '../../team-id';
import { Bomb } from '../token/bomb';
import { Recruit } from '../token/recruit';
import { Token } from '../token/token';
import { Trap } from '../token/trap';
import { Meeple } from './meeple';

export class SecretAgents extends Meeple {
  public static readonly stateChar = "A"
  public static readonly type = "SecretAgents"
  public readonly type = "SecretAgents"
  public readonly title = "Secret Agents"
  getState() {
    return SecretAgents.stateChar + super.getState();
  }
  findTeam() {
    return this.game.findTeam(TeamId.SecretAgents);
  }
  sortOrder() {
    return 1 + super.sortOrder();
  }
  show() {
    return true;
  }
  availableMoves() {
    if (this.team.strength === 0)
      return [this.territory!];
    return this.territory!.allInRange(2, 2, 2, 1).concat(this.territory!);
  }
  tokenRollStrength(token: Token) {
    if (token instanceof Trap)
      return 2;
    if (token instanceof Bomb || token instanceof Recruit)
      return 1;
    return 0;
  }
  public workToken(token: CovertOpToken) {
    const rollStrength = this.tokenRollStrength(token);
    if (rollStrength > 0)
      token.worked(rollStrength, this.team);
  }
}