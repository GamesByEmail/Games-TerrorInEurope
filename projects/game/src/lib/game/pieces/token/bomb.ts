import { Team } from '../../team';
import { TeamId } from '../../team-id';
import { ETokenResult, ETokenType, ETokenVisibility } from '../../team-state';
import { Token } from './token';

export class Bomb extends Token {
  public readonly type = ETokenType.BOMB
  public readonly title = "Bomb"
  svgId() {
    return "#Bomb";
  }
  aged() {
    this.visibility = ETokenVisibility.VISIBLE;
    if (!this.result)
      this.worked(1);
  }
  worked(numDice: number, operative?: Team) {
    this.visibility = ETokenVisibility.VISIBLE;
    const terrorist = this.game.findTeam(TeamId.Terrorist);
    const dice = (operative || terrorist).rollDice(numDice);
    const roll = Math.min(...dice);
    if (roll <= 3)
      this.result = ETokenResult.LOST;
    else {
      this.result = ETokenResult.WON;
      terrorist.addViktoryPoints(this.territory.bombViktoryPoints());
      if (roll === 6 && operative) {
        operative.setStrength(0);
        terrorist.addViktoryPoints(1);
      }
    }
  }
}