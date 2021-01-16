import { Component, NgZone, OnDestroy } from '@angular/core';
import { IMe, testMes } from '@gamesbyemail/base';
import { Game } from 'projects/game/src/lib/game/game';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TestGameService } from '../test-game/test-game.service';
import { testData } from './test-data';

@Component({
  selector: 'development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnDestroy {
  unsub = new Subject();
  me: IMe = testMes.basic;
  testJoingame = testData.terrorInEurope;
  testGame
  public testGameService
  constructor(_ngZone: NgZone) {
    this.testGame = new Game();
    this.testGameService = new TestGameService(
      _ngZone,
      "./StateBrowser",
      this.testGame,
      [{
        over: false,
        players: [
          { title: "David", id: "ASDFASDF" },
          { title: "Jennifer", id: "ASDFASDF" },
          { title: "Jim", id: "ASDFASDF" },
          { title: "Malvin", id: "ASDFASDF" },
          { title: "Falken", id: "ASDFASDF" }
        ],
        states: [
        ]
      }]);
     //_ngZone.runOutsideAngular(()=>{
        this.testGameService.monitor()
      .pipe(takeUntil(this.unsub))
      .subscribe();
      //});
  }
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
