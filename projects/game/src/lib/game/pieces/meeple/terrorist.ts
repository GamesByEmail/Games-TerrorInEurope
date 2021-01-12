import { TeamId } from '../../team-id';
import { Meeple } from './meeple';

export class Terrorist extends Meeple {
  public readonly type = TeamId.Terrorist
  public readonly title = "Terrorist"
  sortOrder() {
    return 4 + super.sortOrder();
  }
}
