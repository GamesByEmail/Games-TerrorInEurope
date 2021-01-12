import { IInfoState, IOpsState, ITerrState, ITokenState } from "projects/game/src/lib/game/team-state";

interface IGameState {
  moveNumber: number
  teams: [IOpsState, IOpsState, IOpsState, IInfoState, ITerrState];
}
interface ITeam {
  uuid?: string;
}

export class ServerService {
  state!: IGameState;
  constructor(private game: any) { }

  init<T extends IGameState>(state: T) {
    this.state = JSON.parse(JSON.stringify(state));
    this.updateWhoWeAre();
    this.game.setState(this.getState());
  }
  updateWhoWeAre() {
    for (let i = 0; i < this.state.teams.length; i++)
      this.game.teams[i].uuid = this.state.teams[i].T ? "ASDFASDFASDF" : undefined;
  }
  setState<T extends IGameState>(state: T, team: ITeam) {
    const oldState = this.state;
    this.state = JSON.parse(JSON.stringify(state));
    if (oldState && this.game.teams[4] !== team)
      this.state.teams[4]._ = oldState.teams[4]._;
    this.move(this.state, oldState);
    this.updateWhoWeAre();
    navigator.clipboard.writeText("\r\nreturn this.game.server.init(" + JSON.stringify(this.state,null,2) + ");\r\n");
  }
  getState() {
    const state = JSON.parse(JSON.stringify(this.state));
    if (!this.game.teams[4].uuid)
      delete (state.teams[4]._);
    return state;
  }
  move<T extends IGameState>(state: T, oldState: T) {
    if (!oldState)
      return;
    if (oldState.teams[3].T && state.teams[4].T) {
      const infoState = state.teams[3];
      if (infoState.a < state.moveNumber - 1) {
        infoState.a = state.moveNumber;
        const terrState = state.teams[4];
        if (!terrState.t)
          terrState.t = [];
        this.ageTokens(terrState.t, 3);
        terrState.t.push(...this.ageTokens(terrState._!.t, 2));
        if (terrState.t.length===0)
          delete terrState.t;
        if (JSON.stringify(terrState.t)!==JSON.stringify(oldState.teams[4].t)){
          delete state.teams[4].T;
          state.teams[3].T=true;
        }
      }
    } else {
      const tState=state.teams[4];
      delete tState.c;
      if (tState._)
        for (let i = 0; i < 3; i++)
          if ((<IOpsState>state.teams[i]).c===tState._.c)
            tState.c=tState._.c;
    }
  }
  ageTokens(tokens: ITokenState[], maxAge: number) {
    const agedOut: ITokenState[] = [];
    for (let i = 0; i < tokens.length; i++)
      if ((++tokens[i].a) > maxAge)
        agedOut.push(tokens.splice(i--, 1)[0]);
    return agedOut;
  }
}