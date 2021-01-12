import { Piece } from '../../piece';
import { TeamId } from '../../team-id';
import { ETokenResult, ETokenType, ETokenVisibility, ITokenState } from '../../team-state';
import { Bomb } from './bomb';
import { Recruit } from './recruit';
import { Trap } from './trap';

export type CovertOpToken = Trap | Recruit | Bomb;

export abstract class Token extends Piece {
  abstract type:ETokenType
  abstract title: string
  abstract aged(): void
  result!: ETokenResult;
  age!: number;
  visibility!: ETokenVisibility;
  setState(state: ITokenState) {
    this._team=this.game.findTeam(TeamId.Terrorist);
    if (state) {
      this.age=state.a;
      this.result=state.r;
      this.visibility=state.v;
    } else {
      this.age = 0;
      this.result = ETokenResult.UNDEFINED;
      this.visibility = ETokenVisibility.HIDDEN;
    }
  }
  getState():ITokenState {
    return {
      c:this.territory.index,
      t:this.type,
      a:this.age,
      v:this.visibility,
      r:this.result
    };
  }
  sortOrder() {
    return 0;
  }
  public isToken(): this is Token {
    return true;
  }
  show() {
    const turnTeam = this.game.findTurnTeam();
    return this.visibility !== ETokenVisibility.HIDDEN || (turnTeam && turnTeam.isTerrorist() && turnTeam.isUs()) || this.territory.hasOperative();
  }
  hasExpired() {
    return this.age > 2;
  }
}