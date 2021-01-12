import { Team } from '../../team';
import { ETokenResult, ETokenType, ETokenVisibility } from '../../team-state';
import { Token } from './token';

export class Recruit extends Token {
  public readonly type = ETokenType.RECRUIT
  public readonly title = "Recruiting Cell"
  svgId() {
    return "#Recruit";
  }
  aged() {
    this.visibility = ETokenVisibility.VISIBLE;
    if (!this.result)
      this.worked(1);
  }
  worked(numDice: number, operative?: Team) {
    this.visibility = ETokenVisibility.VISIBLE;
    const terrorist = this.game.getTerrorist();
    const dice = (operative || terrorist).rollDice(numDice);
    const roll = Math.min(...dice);
    if (roll <= 3)
      this.result = ETokenResult.LOST;
    else {
      ETokenResult.WON;
      terrorist.alterStrength(this.territory.recruitStrengthPoints());
      if (roll === 6 && operative) {
        operative.strength = 0;
        terrorist.viktoryPoints++;
      }
    }
  }
}
