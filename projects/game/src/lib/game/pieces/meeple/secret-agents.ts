import { TeamId } from '../../team-id';
import { Meeple } from './meeple';

export class SecretAgents extends Meeple {
  public readonly type = TeamId.SecretAgents
  public readonly title = "Secret Agents"
  sortOrder() {
    return 1 + super.sortOrder();
  }
}