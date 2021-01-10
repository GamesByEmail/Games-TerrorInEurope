import { Piece } from '../../piece';
import { TeamId } from '../../team-id';

export type TokenResult = "" | "AGED" | "WON" | "LOST";
function serializeTokenResult(result: TokenResult) {
  if (result.length > 0)
    return result.charAt(0).toLowerCase();
  return "";
}
function deserializeTokenResult(result: string): TokenResult {
  if (result === "a")
    return "AGED";
  if (result === "w")
    return "WON";
  if (result === "l")
    return "LOST";
  return "";
}
export type TokenRevealed = "" | "EXISTANCE" | "REVEALED";
function serializeTokenRevealed(revealed: TokenRevealed) {
  if (revealed.length > 0)
    return revealed.charAt(0).toLowerCase();
  return "";
}
function deserializeTokenRevealed(revealed: string): TokenRevealed {
  if (revealed === "e")
    return "EXISTANCE";
  if (revealed === "r")
    return "REVEALED";
  return "";
}

export type TokenChoice = "TRAP" | "RECRUIT" | "BOMB";

export abstract class Token extends Piece {
  result!: TokenResult;
  age!: number;
  revealed!: TokenRevealed;
  findTeam() {
    return this.game.findTeam(TeamId.Terrorist);
  }
  setState(state: string) {
    if (state.search(/(\d+)([awl]?)([er]?)/) === 0) {
      this.age = parseInt(RegExp.$1);
      this.result = deserializeTokenResult(RegExp.$2);
      this.revealed = deserializeTokenRevealed(RegExp.$3);
      state = state.substr(RegExp.$1.length + RegExp.$2.length + RegExp.$3.length);
    } else {
      this.age = 0;
      this.result = "";
      this.revealed = "";
    }
    return state;
  }
  getState() {
    return this.age + serializeTokenResult(this.result) + serializeTokenRevealed(this.revealed);
  }
  sortOrder() {
    return 0;
  }
  public isToken(): this is Token {
    return this.type === "Trap" || this.type === "Recruit" || this.type === "Bomb" || this.type === "None";
  }
  show() {
    const turnTeam = this.game.findTurnTeam();
    return this.revealed !== "" || (turnTeam && turnTeam.isTerrorist() && turnTeam.isUs()) || this.territory!.hasOperative();
  }
  hasExpired() {
    return this.age > 2;
  }
  incrementAge() {
    if (this.hasExpired()) {
      this.territory!.removePiece(this);
      return;
    }
    this.age++;
    if (!this.result && this.hasExpired()) {
      this.aged();
    }
  }
  abstract aged(): void
  abstract title: string
}