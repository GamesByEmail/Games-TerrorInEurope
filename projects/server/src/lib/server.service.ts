import { BaseServer } from "./base.server";
import { ETokenType, ETokenVisibility, IOpsState, ITerrState, ITokenState } from "projects/game/src/lib/game/team-state";
import { Game, IGameOptions, IGameState } from "projects/game/src/lib/game/game";
import { IGameData } from "@gamesbyemail/base";
import { TeamId } from "projects/game/src/lib/game/team-id";

export class ServerService extends BaseServer<Game, IGameState> {
  protected buildInitialState(gameData: IGameData<IGameOptions, IGameState, TeamId>): IGameState {
    return {
      moveNumber: 0,
      teams: [
        { $T: true, c: -1, s: 6 },
        { c: -1, s: 6 },
        { c: -1, s: 6 },
        { a: 0 },
        { v: 0, s: 12 }
      ],
      moves: []
    };
  }
  protected move(state: IGameState, oldState: IGameState) {
    if (!oldState)
      return;
    if (oldState.teams[3].$T && state.teams[4].$T) {
      const infoState = state.teams[3];
      if (infoState.a < state.moveNumber - 1) {
        infoState.a = state.moveNumber;
        const terrState = state.teams[4];
        this.ageTokens(terrState);
        if (terrState.t && terrState.t.length === 0)
          delete terrState.t;
        if (JSON.stringify(terrState.t) !== JSON.stringify(oldState.teams[4].t)) {
          delete state.teams[4].$T;
          state.teams[3].$T = true;
        }
      }
    } else {
      const tState = state.teams[4];
      delete tState.c;
      if (tState.$_) {
        for (let i = 0; i < 3; i++) {
          const newOpsState = state.teams[i] as IOpsState;
          const oldOpsState = oldState.teams[i] as IOpsState;
          const justMovedHere = this.justMovedHere(newOpsState, oldOpsState)
          if (newOpsState.c === tState.$_.c && newOpsState.s > 0) {
            tState.c = tState.$_.c;
            if (justMovedHere) {
              tState.c = tState.$_.c;
              this.setTurn(state, newOpsState);
            } else if (this.justRevivedHere(newOpsState, oldOpsState)) {
              newOpsState.s = 0;
              this.revealTokens(tState, newOpsState.c, false);
            }
          }
          if (justMovedHere && this.revealTokens(tState, newOpsState.c, true) > 0)
            this.setTurn(state, newOpsState);
        }
        if (typeof (tState.c) !== "number" && tState.t && tState.t.find(t => t.t === "m" && t.a === 0))
          tState.c = tState.$_.c;
      }
    }
  }
  private ageTokens(tState: ITerrState) {
    const vTokens = this.ageTokensList(tState.$_!.t, 2)
    if (!tState.t)
      tState.t = [];
    this.ageTokensList(tState.t, 3);
    tState.t = tState.t.filter(t => vTokens.find(v => t.c === v.c));
    tState.t.push(...vTokens);
  }
  private ageTokensList(tokens: ITokenState[], maxAge: number) {
    const agedOut: ITokenState[] = [];
    for (let i = 0; i < tokens.length; i++)
      if ((++tokens[i].a) > maxAge)
        agedOut.push(tokens.splice(i--, 1)[0]);
    return agedOut;
  }
  private justMovedHere(nState: IOpsState, oState: IOpsState) {
    return oState.$T && nState.c !== oState.c;
  }
  private justRevivedHere(nState: IOpsState, oState: IOpsState) {
    return oState.$T && nState.c === oState.c && oState.s === 0 && nState.s > 0;
  }
  private revealTokens(tState: ITerrState, c: number, fullReveal: boolean) {
    let count = 0;
    if (tState.$_) {
      const priTokens = tState.$_.t;
      for (let i = 0; i < priTokens.length; i++) {
        const priToken = priTokens[i];
        if (priToken.c === c)
          if (fullReveal) {
            count++;
            if (!tState.t)
              tState.t = [];
            tState.t.push(priToken);
            priToken.v = ETokenVisibility.VISIBLE;
            tState.$_.t.splice(i--, 1);
          } else if (priToken.v !== ETokenVisibility.EXISTANCE) {
            priToken.v = ETokenVisibility.EXISTANCE;
            if (!tState.t)
              tState.t = [];
            tState.t = tState.t.filter(t => t.c !== c);
            tState.t.push({
              c: priToken.c,
              t: ETokenType.UNKNOWN,
              a: priToken.a,
              r: priToken.r,
              v: ETokenVisibility.VISIBLE
            });
          }
      }
    }
    return count;
  }
}