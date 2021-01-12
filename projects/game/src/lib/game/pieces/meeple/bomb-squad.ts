import { TeamId } from '../../team-id';
import { Meeple } from './meeple';

export class BombSquad extends Meeple {
  public readonly type = TeamId.BombSquad
  public readonly title = "Bomb Squad"
  sortOrder() {
    return 2 + super.sortOrder();
  }
}