import { IPieceSave, Piece } from '../../piece';
import { TeamId } from '../../team-id';
import { ETokenResult, ETokenType, ETokenVisibility, ITokenState } from '../../team-state';
import { Bomb } from './bomb';
import { Recruit } from './recruit';
import { Trap } from './trap';

export type CovertOpToken = Trap | Recruit | Bomb;

interface ITokenSave {
  result: ETokenResult
  age: number
  visibility: ETokenVisibility
}

export abstract class Token extends Piece {
  abstract type: ETokenType
  abstract title: string
  abstract aged(): void
  result!: ETokenResult;
  age!: number;
  visibility!: ETokenVisibility;
  setState(state: ITokenState) {
    this._team = this.game.findTeam(TeamId.Terrorist);
    if (state) {
      this.age = state.a;
      this.result = state.r;
      this.visibility = state.v;
    } else {
      this.age = 0;
      this.result = ETokenResult.UNDEFINED;
      this.visibility = ETokenVisibility.HIDDEN;
    }
  }
  getState(): ITokenState {
    return {
      c: this.territory.index,
      t: this.type,
      a: this.age,
      v: this.visibility,
      r: this.result
    };
  }
  saving() {
    const saving = <IPieceSave<ITokenSave>>super.saving();
    saving.data = {
      result: this.result,
      age: this.age,
      visibility: this.visibility
    };
    return saving;
  }
  restoring(saved: IPieceSave<ITokenSave>) {
    super.restoring(saved);
    if (saved.data) {
      this.result = saved.data.result;
      this.age = saved.data.age;
      this.visibility = saved.data.visibility;
    }
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
  isCovertOps() {
    return false;
  }
  increment(terroristReMoving: boolean = false) {
    if (terroristReMoving)
      if (this.hasExpired())
        this.changeTerritory(undefined!);
      else
        this.age++;
    if (this.hasExpired() && !this.result)
      this.aged();
  }
}