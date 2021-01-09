import { TeamId } from '../../team-id';
import { Meeple } from './meeple';

export class Terrorist extends Meeple {
  public static readonly stateChar = "T"
  public static readonly type = "Terrorist"
  public readonly type = "Terrorist"
  public readonly title = "Terrorist"
  getState() {
    return Terrorist.stateChar + super.getState();
  }
  findTeam() {
    return this.game.findTeam(TeamId.Terrorist);
  }
  sortOrder() {
    return 4 + super.sortOrder();
  }
  show() {
    const turnTeam = this.game.findTurnTeam();
    return (turnTeam && turnTeam.isTerrorist() && turnTeam.isUs()) || this.territory!.hasOperative();
  }
  availableMoves() {
    return this.territory!.allInRange(1, 2, 1, 1).filter(c => !c.findToken(false));
  }
}
