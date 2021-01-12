import { ETokenResult, ETokenType, ETokenVisibility } from '../../team-state';
import { Token } from './token';

export class Marker extends Token {
  public readonly type = ETokenType.MARKER
  public readonly title = "Marker"
  svgId() {
    return "#Marker";
  }
  aged() {
    this.visibility = ETokenVisibility.VISIBLE;
    this.result = ETokenResult.AGED;
  }
}