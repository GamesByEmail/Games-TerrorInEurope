import { TeamId } from '../../team-id';
import { Meeple } from './meeple';

export class SpecialForces extends Meeple {
  public readonly type = TeamId.SpecialForces
  public readonly title = "Special Forces"
  sortOrder() {
    return 3 + super.sortOrder();
  }
}
