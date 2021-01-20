import { Team } from '../../team';
import { TeamId } from '../../team-id';
import { ETokenResult, ETokenType, ETokenVisibility } from '../../team-state';
import { Token } from './token';

export class Trap extends Token {
  public readonly type = ETokenType.TRAP
  public readonly title = "Trap"
  svgId() {
    return "#Trap" + (
      this.result === ETokenResult.AGED ? "Aged" :
        "");
  }
  isCovertOps() {
    return true;
  }
  aged() {
    this.visibility = ETokenVisibility.VISIBLE;
    if (!this.result)
      this.worked(1);
  }
  worked(numDice: number, operative?: Team) {
    this.visibility = ETokenVisibility.VISIBLE;
    if (operative) {
      const dice = operative.rollDice(numDice);
      const roll = Math.min(...dice);
      operative.alterStrength(-roll);
      if (operative.isDead()) {
        this.result = ETokenResult.WON;
        const terrorist = this.game.findTeam(TeamId.Terrorist);
        terrorist.addViktoryPoints(1);
      } else
        this.result = ETokenResult.LOST;
    } else
      this.result = ETokenResult.AGED;
  }
}
