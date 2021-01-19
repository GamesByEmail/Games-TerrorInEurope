import { Subject } from "rxjs";
import { IBaseMove, IGameData } from "@gamesbyemail/base";

interface ISecureRandom {
  t: string
  v: number
}
export interface IBaseTeamState {
  $T?: boolean // myTurn, should default to false.
  $P?: boolean // playing, should default to true.
  "$@"?: boolean // An automatically submitted turn, defaults to false.
  $_?: any     // Private data, can only be set and seen by owner.
}
export interface IBaseGameState<ITeamState extends IBaseTeamState, IMove extends IBaseMove<any>> {
  moveNumber: number
  teams: ITeamState[]
  moves: IMove[]
  "$@"?: boolean
  "$#"?: ISecureRandom[]
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

  public stateBuffer: IGameState[] = [];
  public moveMade = new Subject<IGameState>();
  constructor(private game: IGame) { }

  protected initialize(gameData: IGameData<any, IGameState, any>): IGameData<any, IGameState, any> {
    gameData.states.push(this.buildInitialState(gameData));
    return gameData;
  }
  protected truncate(moveNumber: number) {
    const index = this.stateBuffer.findIndex(state => state.moveNumber === moveNumber);
    if (index >= 0)
      this.stateBuffer.length = index;
  }
  private getLastState() {
    return this.stateBuffer[this.stateBuffer.length - 1];
  }
  public playTest(gameData: IGameData<any, IGameState, any>) {
    gameData = this.cloneData(gameData);
    this.game.abandonState();
    if (gameData.states.length === 0)
      this.initialize(gameData);
    this.stateBuffer = gameData.states;
    const lastState = this.getLastState();
    const usArray = this.usArrayFromState(lastState);
    gameData.players.forEach((player, index) => player.id = usArray[index] ? "ASDFASDFASDF" : undefined);
    gameData.states = gameData.states.map(state => this.cleansedState(state, usArray));
    this.game.setGameData(gameData);
    //this.debugTeamIsUs();
  }
  public debugTeamIsUs() {
    console.log("teams", JSON.stringify(this.game.teams.map(team => team.isUs()), null, 2))
  }
  public goToMove(moveNumber: number, teamIndex: number) {
    this.game.abandonState();
    const state = this.stateBuffer.find(state => state.moveNumber === moveNumber)!;
    const usArray = state.teams.map((team, index) => index === teamIndex);
    this.setTeamIsUs(usArray);
    this.game.setState(this.prepState(state, usArray));
    //this.debugTeamIsUs();
  }
  protected cloneData<T>(value: T): T {
    return JSON.parse(JSON.stringify(value))
  }
  protected objectsEqual(v1: any, v2: any) {
    if (Array.isArray(v1)) {
      if (!Array.isArray(v2) || v1.length !== v2.length)
        return false;
      if (v1 !== v2)
        for (let i = 0; i < v1.length; i++)
          if (!this.objectsEqual(v1[i], v2[i]))
            return false;
      return true;
    }
    if (typeof (v1) === "object" && v1) {
      if (typeof (v2) !== "object" || !v2)
        return true;
      const p1 = Object.getOwnPropertyNames(v1);
      const p2 = Object.getOwnPropertyNames(v2);
      if (p1.length !== p2.length)
        return false;
      for (let i = 0; i < p1.length; i++)
        if (!p2.includes(p1[i]))
          return false;
      for (let i = 0; i < p1.length; i++) {
        const p = p1[i];
        if (!this.objectsEqual(v1[p], v2[p]))
          return false;
      }
      return true;
    }
    return v1 === v2;
  }
  protected clearTurns(state: IGameState) {
    state.teams.forEach(team => delete team.$T);
  }
  protected setTurn(state: IGameState, team: IBaseTeamState) {
    state.teams.forEach(team => delete team.$T);
    team.$T = true;
  }
  private usArrayFromState(state: IGameState) {
    return state.teams.map(state => state.$T);
  }
  private setTeamIsUs(usArray: boolean[]) {
    this.game.teams.forEach((team, index) => team.player.id = usArray[index] ? "ASDFASDFASDF" : undefined);
  }
  protected pushState(clonedState: IGameState) {
    this.stateBuffer.push(clonedState);
    this.moveMade.next(clonedState);
  }
  public rollDie(max: number = 6, min: number = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  public getSecureRandom(type: string): ISecureRandom {
    let value = 0;
    switch (type) {
      case "D6":
        value = this.rollDie();
        break;
    }
    return { t: type, v: value };
  }
  public processNewState(state: IGameState, isAutomatic: boolean = false) {
    const secureRandom: ISecureRandom[] = [];
    state = JSON.parse(JSON.stringify(state).replace(/"(?:\\x01|\\u0001)(\w+)"/g, ($0, $1) => {
      console.log($0,$1);
      const value = this.getSecureRandom($1);
      secureRandom.push(value);
      return value.v.toString();
    }));
    if (isAutomatic)
      state["$@"] = true;
    else
      delete state["$@"];
    if (secureRandom.length > 0)
      state["$#"] = secureRandom;
    else
      delete state["$#"];
    return state;
  }
  public setState(state: IGameState, team: IBaseTeam, isAutomatic: boolean = false) {
    const newState = this.processNewState(state, isAutomatic);
    this.truncate(state.moveNumber);
    const oldState = this.getLastState();
    if (oldState)
      for (let i = 0; i < newState.teams.length; i++) {
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
            newTeamState.$_ = this.cloneData(oldTeamState.$_);
        }
      }
    this.move(newState, oldState);
    this.pushState(newState);
    const usArray = this.usArrayFromState(newState);
    this.setTeamIsUs(usArray);
  }
  public getState() {
    const usArray = this.game.teams.map(team => team.isUs());
    return this.prepState(this.getLastState(), usArray);
  }
  public prepState(state: IGameState, usArray: boolean[]) {
    return this.cleansedState(state, usArray);
  }
  public cleansedState(state: IGameState, usArray: boolean[]) {
    state = this.cloneData(state);
    for (let i = 0; i < state.teams.length; i++)
      if (!usArray[i])
        delete (state.teams[i].$_);
    return state;
  }

}