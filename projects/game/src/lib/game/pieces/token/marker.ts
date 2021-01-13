import { ETokenResult, ETokenType, ETokenVisibility, ITokenState } from '../../team-state';
import { Token } from './token';

export class Marker extends Token {
  public readonly type = ETokenType.MARKER
  public readonly title = "Marker"
  setState(state: ITokenState) {
    super.setState(state);
    this.visibility = ETokenVisibility.VISIBLE;
  }
  svgId() {
    return "#Marker";
  }
  aged() {
    this.result = ETokenResult.AGED;
  }
}