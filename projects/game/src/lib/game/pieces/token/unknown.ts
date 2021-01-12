import { ETokenResult, ETokenType, ETokenVisibility } from '../../team-state';
import { Token } from './token';

export class Unknown extends Token {
  public readonly type = ETokenType.UNKNOWN
  public readonly title = "Unknown"
  svgId() {
    return "#Unknown";
  }
  aged() {
    this.visibility = ETokenVisibility.VISIBLE;
    this.result = ETokenResult.AGED;
  }
}