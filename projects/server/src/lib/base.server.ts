import { ReplaySubject } from "rxjs";
import { IBaseMove, IGameData } from "@gamesbyemail/base";

export interface IBaseTeamState {
  $T?: boolean // myTurn, should default to false.
  $P?: boolean // playing, should default to true.
  $_?: any     // Private data, can only be set and seen by owner.
}
export interface IBaseGameState<ITeamState extends IBaseTeamState, IMove extends IBaseMove<any>> {
  moveNumber: number
  teams: ITeamState[]
  moves: IMove[]
}
export interface IBaseTeam {
  uuid?: string
}
export interface IBaseStateGame<IGameData, IGameState, ITeam extends IBaseTeam> {
  setState: (state: IGameState) => IGameState
  abandonState: () => any
  setGameData: (gameData: IGameData) => any
  teams: ITeam[]
}
export abstract class BaseServer<IGame extends IBaseStateGame<any, any, any>, IGameState extends IBaseGameState<any, any>> {
  protected abstract move(state: IGameState, oldState: IGameState): void
  protected abstract buildInitialState(gameData: IGameData<any, IGameState, any>): IGameState

  private _history = new ReplaySubject<IGameState>()
  public history = this._history.asObservable();
  constructor(private game: IGame) { }

  protected initialize(gameData: IGameData<any, IGameState, any>): IGameData<any, IGameState, any> {
    gameData.states.push(this.buildInitialState(gameData));
    return gameData;
  }

  public playTest(gameData: IGameData<any, IGameState, any>) {
    if (gameData.states.length === 0)
      gameData = this.initialize(gameData);
    this.historyBuffer().length = 0;
    gameData.states.forEach(state => this.pushState(this.cloneState(state)));
    this.game.setGameData(gameData);
  }
  public goToMove(moveNumber: number, teamIndex: number) {
    this.setTeamIsUs(teamIndex);
    this.game.abandonState();
    this.game.setState(this.getState(moveNumber));
  }
  protected cloneState(state: IGameState) {
    return JSON.parse(JSON.stringify(state))
  }
  private historyBuffer() {
    return <IGameState[]>((<any>this._history)._events) || ((<any>this._history).buffer);
  }
  protected current(moveNumber?: number) {
    const buffer = this.historyBuffer();
    return this.cloneState(typeof (moveNumber) === "number" ? buffer.find(state => state.moveNumber === moveNumber)! : buffer[buffer.length - 1]);
  }
  protected clearTurns(state: IGameState) {
    state.teams.forEach(team => delete team.$T);
  }
  protected setTurn(state: IGameState, team: IBaseTeamState) {
    state.teams.forEach(team => delete team.$T);
    team.$T = true;
  }
  private setTeamIsUs(using: IGameState | number) {
    if (typeof (using) === "number")
      for (let i = 0; i < this.game.teams.length; i++)
        this.game.teams[i].uuid = i === using ? "ASDFASDFASDF" : undefined;
    else
      for (let i = 0; i < using.teams.length; i++)
        this.game.teams[i].uuid = using.teams[i].$T ? "ASDFASDFASDF" : undefined;
  }
  protected pushState(state: IGameState) {
    this._history.next(state);
    this.setTeamIsUs(state);
  }
  public setState(state: IGameState, team: IBaseTeam) {
    const oldState = this.current();
    const newState = this.cloneState(state);
    if (oldState)
      for (let i = 0; i < state.teams.length; i++) {
        const newTeamState = newState.teams[i];
        if (!newTeamState.$T)
          delete newTeamState.$T;
        if (newTeamState.$P)
          delete newTeamState.$P;
        if (this.game.teams[i] !== team) {
          const oldTeamState = oldState.teams[i];
          if (!oldTeamState || oldTeamState.$_ === undefined)
            delete newTeamState.$_;
          else
            newTeamState.$_ = oldTeamState.$_;
        }
      }
    this.move(newState, oldState);
    this.pushState(newState);
  }
  public getState(moveNumber?: number) {
    const state = this.current(moveNumber);
    for (let i = 0; i < state.teams.length; i++) {
      const team = this.game.teams[i];
      if (!team || !team.uuid)
        delete (state.teams[i].$_);
    }
    return state;
  }

}