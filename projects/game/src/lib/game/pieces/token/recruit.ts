import { Team } from '../../team';
import { TeamId } from '../../team-id';
import { Token } from './token';

export class Recruit extends Token {
  public static readonly stateChar = "r"
  public static readonly type = "Recruit"
  public readonly type = "Recruit"
  public readonly title = "Recruiting Cell"
  getState() {
    return Recruit.stateChar + super.getState();
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
      terrorist.alterStrength(this.territory!.recruitStrengthPoints());
      if (roll === 6 && operative) {
        operative.strength = 0;
        terrorist.viktoryPoints++;
      }
    }
  }
}
