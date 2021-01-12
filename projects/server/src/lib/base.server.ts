
export interface IBaseTeamState {
  $T?: boolean // myTurn, should default to false.
  $P?: boolean // playing, should default to true.
  $_?: any     // Private data, can only be set and seen by owner.
}
export interface IBaseGameState {
  moveNumber: number
  teams: IBaseTeamState[];
}
export interface IBaseTeam {
  uuid?: string;
}

export abstract class BaseServer<IGameState extends IBaseGameState> {
  state!: IGameState;
  constructor(private game: any) { }

  init<T extends IGameState>(state: T) {
    this.state = JSON.parse(JSON.stringify(state));
    this.updateWhoWeAre();
    this.game.setState(this.getState());
  }
  clearTurns(state: IGameState) {
    state.teams.forEach(team => delete team.$T);
  }
  updateWhoWeAre() {
    for (let i = 0; i < this.state.teams.length; i++)
      this.game.teams[i].uuid = this.state.teams[i].$T ? "ASDFASDFASDF" : undefined;
  }
  setState(state: IGameState, team: IBaseTeam) {
    const oldState = this.state;
    this.state = JSON.parse(JSON.stringify(state));
    if (oldState)
      for (let i = 0; i < state.teams.length; i++)
        if (this.game.teams[i] !== team) {
          const oldTeamState = oldState.teams[i];
          if (!oldTeamState || oldTeamState.$_ === undefined)
            delete this.state.teams[i].$_;
          else
            this.state.teams[i].$_ = oldTeamState.$_;
        }
    this.move(this.state, oldState);
    this.updateWhoWeAre();
    navigator.clipboard.writeText("\r\nreturn this.game.server.init(" + JSON.stringify(this.state, null, 2) + ");\r\n");
  }
  getState() {
    const state = JSON.parse(JSON.stringify(this.state));
    for (let i = 0; i < state.teams.length; i++) {
      const team = this.game.teams[i];
      if (!team || !team.uuid)
        delete (state.teams[i].$_);
    }
    return state;
  }
  abstract move(state: IGameState, oldState: IGameState): void
}