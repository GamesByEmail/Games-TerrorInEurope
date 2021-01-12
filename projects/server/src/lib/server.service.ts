import { BaseServer } from "./base.server";
import { IOpsState, ITokenState } from "projects/game/src/lib/game/team-state";
import { IGameState } from "projects/game/src/lib/game/game";

export class ServerService extends BaseServer<IGameState> {
  move(state: IGameState, oldState: IGameState) {
    if (!oldState)
      return;
    if (oldState.teams[3].$T && state.teams[4].$T) {
      const infoState = state.teams[3];
      if (infoState.a < state.moveNumber - 1) {
        infoState.a = state.moveNumber;
        const terrState = state.teams[4];
        if (!terrState.t)
          terrState.t = [];
        this.ageTokens(terrState.t, 3);
        terrState.t.push(...this.ageTokens(terrState.$_!.t, 2));
        if (terrState.t.length === 0)
          delete terrState.t;
        if (JSON.stringify(terrState.t) !== JSON.stringify(oldState.teams[4].t)) {
          delete state.teams[4].$T;
          state.teams[3].$T = true;
        }
      }
    } else {
      const tState = state.teams[4];
      delete tState.c;
      if (tState.$_)
        for (let i = 0; i < 3; i++) {
          const oState=state.teams[i] as IOpsState;
          if (oState.c === tState.$_.c) {
            tState.c = tState.$_.c;
            if (this.justMovedHere(oState, oState)) {
              this.clearTurns(state);
              oState.$T=true;
            }
          }
        }
    }
  }
  ageTokens(tokens: ITokenState[], maxAge: number) {
    const agedOut: ITokenState[] = [];
    for (let i = 0; i < tokens.length; i++)
      if ((++tokens[i].a) > maxAge)
        agedOut.push(tokens.splice(i--, 1)[0]);
    return agedOut;
  }
  justMovedHere(nState: IOpsState, oState: IOpsState) {
    return oState.$T && nState.c !== oState.c;
  }
  justRevivedHere(nState: IOpsState, oState: IOpsState) {
    return oState.$T && nState.c === oState.c && oState.s === 0 && nState.s > 0;
  }
}