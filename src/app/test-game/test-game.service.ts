import { NgZone } from '@angular/core';
import { IGameData } from '@gamesbyemail/base';
import { fromEvent, merge, NEVER, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, finalize, ignoreElements, mergeMap, tap } from 'rxjs/operators';

interface IStateGame {
  teams: { title: string }[]
  server: {
    stateBuffer: any[]
    moveMade: Observable<any>
    goToMove: (moveNumber: number, teamIndex: number) => any
    playTest: (gameData: IGameData<any, any, any>) => any
  }
  annotateState?: (gameState: any) => any
}

export class TestGameService {
  private index
  private localStorageKey
  private resetting
  private annotations: any[][] = [];
  constructor(private _ngZone: NgZone, private sbUrl: string, private game: IStateGame, private gameData: IGameData<any, any, any>[], private jsonIndent = 2) {
    this.sbUrl = (new URL(this.sbUrl, window.location.href)).href
    this.localStorageKey = "GBE Test " + (document.head.querySelector("TITLE")?.textContent || "Unknown");
    this.index = 0;
    this.resetting = false;
    try {
      let data = window.localStorage.getItem(this.localStorageKey);
      if (data) {
        if (data.search(/(\d+):/) === 0) {
          this.index = parseInt(RegExp.$1);
          data = data.substr(RegExp.$1.length + 1);
        }
        this.gameData = JSON.parse(data);
        this.recoverAnnotations();
      }
    } catch (e) {
    }
  }
  private sbWindows = new ReplaySubject<Window>();
  private windows = new Subject<Window>();
  getWindowBuffer() {
    return <Window[]>((<any>this.sbWindows)._events || (<any>this.sbWindows).buffer);
  }
  public monitor() {
    this.game.server.playTest(this.gameData[this.index]);
    var subscription = this._ngZone.runOutsideAngular(() => {
      return merge(
        this.game.server.moveMade
          .pipe(filter(() => !this.resetting))
          .pipe(mergeMap(state => {
            const sIndex = this.gameData[this.index].states.length;
            this.gameData[this.index].states.push(state);
            const pair = {
              state: state,
              annotation: this.getAnnotation(sIndex, state)
            };
            this.save();
            return this.sbWindows
              .pipe(filter(sbWindow => !sbWindow.closed))
              .pipe(tap(sbWindow => sbWindow.postMessage({ type: "state", pair: pair }, "*")));
          })),
        fromEvent<MessageEvent>(window, "message")
          .pipe(filter(message => message.data && (message.data.type === "ready" || message.data.type === "waiting")))
          .pipe(tap(message => {
            const sbWindow = message.source as Window;
            const type = message.data.type;
            const buffer = this.getWindowBuffer();
            const index = buffer.indexOf(sbWindow);
            if (index >= 0 && type === "waiting")
              return;
            if (index >= 0)
              buffer.splice(index, 1);
            this.sbWindows.next(message.source as Window)
          })),

        this.sbWindows
          .pipe(filter(sbWindow => !sbWindow.closed))
          .pipe(tap(sbWindow => {
            this.windows.next(sbWindow);
            this.sendTeamTitles(sbWindow);
            this.sendCurrentStates(sbWindow);
          })),
        fromEvent<MessageEvent>(window, "message")
          .pipe(filter(message => message.data && (message.data.type === "goToMove")))
          .pipe(tap(message => {
            this._ngZone.run(() => {
              this.game.server.goToMove(message.data.moveNumber, message.data.teamIndex)
            });
          }))
      )
        .pipe(ignoreElements())
        .subscribe();
    });
    return NEVER.pipe(finalize(() => subscription.unsubscribe()));
  }
  public openStateBrowser() {
    window.open(this.sbUrl, "_blank");
  }
  private save() {
    try {
      window.localStorage.setItem(this.localStorageKey, this.index + ":" + JSON.stringify(this.gameData));
    } catch (e) {
      console.error("Error storing " + this.gameData[this.index].states.length + " states.");
    }
  }
  public reset() {
    this.resetting = true;
    window.localStorage.removeItem(this.localStorageKey);
    this.gameData[this.index].states.length = 0;
    if (this.annotations[this.index])
      this.annotations[this.index].length = 0;
    this.sendTeamTitlesToAll();
    this.game.server.playTest(this.gameData[this.index]);
    this.save();
    this.sendCurrentStatesToAll();
    this.resetting = false;
  }
  private recoverAnnotations() {
    this.gameData.forEach((data, index) => {
      this.annotations[index] = data.states.map(state => this.game.annotateState && this.game.annotateState(state));
    });
  }
  private getAnnotation(index: number, state: any) {
    if (!this.annotations[this.index])
      this.annotations[this.index] = [];
    return this.annotations[this.index][index] = this.game.annotateState && this.game.annotateState(state);
  }
  private sendTeamTitlesToAll() {
    this.getWindowBuffer().forEach(sbWindow => this.sendTeamTitles(sbWindow));
  }
  private sendTeamTitles(sbWindow: Window) {
    if (!sbWindow.closed)
      sbWindow.postMessage({ type: "teamTitles", titles: this.game.teams.map(team => team.title), jsonIndent: this.jsonIndent }, "*");
  }
  private sendCurrentStatesToAll() {
    this.getWindowBuffer().forEach(sbWindow => this.sendCurrentStates(sbWindow));
  }
  private sendCurrentStates(sbWindow: Window) {
    if (!sbWindow.closed) {
      const annotations = this.annotations[this.index];
      sbWindow.postMessage({
        type: "states",
        pairs: this.gameData[this.index].states.map((state, index) => {
          return { state: state, annotation: annotations[index] };
        })
      }, "*");
    }
  }
}