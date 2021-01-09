import { Team } from '../../team';
import { TeamId } from '../../team-id';
import { Token } from './token';

export class Bomb extends Token {
  public static readonly stateChar = "b"
  public static readonly type = "Bomb"
  public readonly type = "Bomb"
  public readonly title = "Bomb"
  getState() {
    return Bomb.stateChar + super.getState();
  }
  aged() {
    this.revealed = "REVEALED";
    if (!this.result)
      this.worked(1);
  }
  worked(numDice: number, operative?: Team) {
    this.revealed = "REVEALED";
    const terrorist = this.game.findTeam(TeamId.Terrorist);
    const dice = (operative || terrorist).rollDice(numDice);
    const roll = Math.min(...dice);
    if (roll <= 3)
      this.result = "LOST";
    else {
      this.result = "WON";
      terrorist.addViktoryPoints(this.territory!.bombViktoryPoints());
      if (roll === 6 && operative) {
        operative.setStrength(0);
        terrorist.addViktoryPoints(1);
      }
    }
  }
}