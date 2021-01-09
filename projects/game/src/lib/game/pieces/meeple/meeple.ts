import { Territory } from '../../territory';
import { Piece } from '../../piece';

export abstract class Meeple extends Piece {
  getState() {
    return "";
  }
  sortOrder(): number {
    return (this.team.strength === 0 ? 0 : 10) + (this.team.isUs() ? 100 : 0) + (this.team.myTurn ? 1000 : 0);
  }
  abstract availableMoves(): Territory[]

  combat(opponent: Meeple) {
    const ourRolls = this.team.rollForCombat(opponent.team, this.territory!, false);
    const opponetRolls = opponent.team.rollForCombat(this.team, this.territory!, true);
    const ourTotal = ourRolls[0] + ourRolls[1];
    const opponetTotal = opponetRolls[0] + opponetRolls[1];
    if (ourTotal < opponetTotal)
      this.team.alterStrength(opponetTotal - ourTotal);
    else if (ourTotal > opponetTotal)
      opponent.team.alterStrength(opponetTotal - ourTotal);
    return this.team.strength === 0;
  }
}