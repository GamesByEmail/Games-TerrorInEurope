import { Token } from './token';

export class None extends Token {
  public static readonly stateChar = "n"
  public static readonly type = "None"
  public readonly type = "None"
  public readonly title = "None"
  getState() {
    return None.stateChar + super.getState();
  }
  aged() {
    this.revealed = "REVEALED";
    this.result = "AGED";
  }
}