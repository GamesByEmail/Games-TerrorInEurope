import { Team } from '../../team';
import { TeamId } from '../../team-id';
import { Token } from './token';

export class Trap extends Token {
  public static readonly stateChar = "t"
  public static readonly type = "Trap"
  public readonly type = "Trap"
  public readonly title = "Trap"
  getState() {
    return Trap.stateChar + super.getState();
  }
  aged() {
    this.revealed = "REVEALED";
    if (!this.result)
      this.worked(1);
  }
  worked(numDice: number, operative?: Team) {
    this.revealed = "REVEALED";
    if (operative) {
      const dice = operative.rollDice(numDice);
      const roll = Math.min(...dice);
      operative.alterStrength(-roll);
      if (operative.strength === 0) {
        this.result = "WON";
        const terrorist = this.game.findTeam(TeamId.Terrorist);
        terrorist.addViktoryPoints(1);
      } else
        this.result = "LOST";
    } else
      this.result = "AGED";
  }
}
