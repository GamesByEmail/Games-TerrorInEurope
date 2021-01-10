import { Territory } from '../../territory';
import { Piece } from '../../piece';

export abstract class Meeple extends Piece {
  setState(state: string) {
    return state;
  }
  getState() {
    return "";
  }
  sortOrder(): number {
    return (this.team.strength === 0 ? 0 : 10) + (this.team.isUs() ? 100 : 0) + (this.team.myTurn ? 1000 : 0);
  }
  abstract availableMoves(): Territory[]
}