import { Component, ViewChild } from '@angular/core';
import { IMe, testMes } from '@gamesbyemail/base';
import { PlayComponent } from 'projects/game/src/lib/components/play/play.component';
import { fromEvent, ReplaySubject, Subject } from 'rxjs';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';
import { testData } from './test-data';

@Component({
  selector: 'development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent {
  unsub = new Subject();
  me: IMe = testMes.basic;
  game = testData.terrorInEurope;
  @ViewChild(PlayComponent) playComponent?: PlayComponent
   sbUrl = (new URL("./StateBrowser", window.location.href)).href;
  constructor() {
    const sbWindows = new ReplaySubject<Window>();
    fromEvent<MessageEvent>(window, "message")
      .pipe(filter(message => message.data && (message.data.type === "ready" || message.data.type === "waiting")))
      .subscribe(message => {
        const sbWindow=message.source as Window;
        const type=message.data.type;
        const buffer=<Window[]>((<any>sbWindows)._events || (<any>sbWindows).buffer);
        const index=buffer.indexOf(sbWindow);
        if (index>=0 && type==="waiting")
          return;
        if (index>=0)
          buffer.splice(index,1);
        sbWindows.next(message.source as Window)
      });
        const windows = new Subject<Window>();
    sbWindows
      .pipe(filter(sbWindow => !sbWindow.closed))
      .pipe(takeUntil(this.unsub))
      .subscribe(sbWindow => {
        windows.next(sbWindow);
        console.log("sending titles")
        sbWindow.postMessage({ type: "teamTitles", titles: this.playComponent!.game.teams.map(team => team.title) }, "*");
        this.playComponent!.game.server.history
          .pipe(takeWhile(() => !sbWindow.closed))
          .pipe(takeUntil(windows.pipe(filter(newSub => newSub === sbWindow))))
          .pipe(takeUntil(this.unsub))
          .subscribe(state => {
            console.log("sending state")
            sbWindow.postMessage({ type: "state", state: state }, "*");
          });
      });
   fromEvent<MessageEvent>(window, "message")
  .pipe(filter(message => message.data && (message.data.type === "goToMove")))
  .subscribe(message => {
    this.playComponent!.game.server.goToMove(message.data.moveNumber,message.data.teamIndex);
  });

  }
  openStateBrowser() {
    window.open(this.sbUrl, "_blank");
  }
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
