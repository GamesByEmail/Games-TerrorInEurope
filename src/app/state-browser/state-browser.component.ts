import { Component, NgZone, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IGameState } from 'projects/game/src/lib/game/game';
import { Subject, timer } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';
import { annotatedJson } from './annotated-json';

interface IFeature {
  open: boolean
  annotate: boolean
  annotation: any
}

@Component({
  selector: 'gamesbyemail-base-statebrowser',
  templateUrl: './state-browser.component.html',
  styleUrls: ['./state-browser.component.css'],
  host: { "[class]": "inactive ? 'inactive' : ''" }
})
export class StateBrowserComponent implements OnDestroy {
  unsub = new Subject()
  states: IGameState[] = []
  annotations: any[] = []
  features: IFeature[] = []
  teamTitles: string[] = []
  inactive = true
  constructor(titleService: Title,_ngZone: NgZone) {
    titleService.setTitle(titleService.getTitle() + " - State Browser");
    fromEvent<MessageEvent>(window, "message")
      .pipe(filter(event => typeof (event.data.type) === "string"))
      .pipe(takeUntil(this.unsub))
      .subscribe(message => {
        switch (message.data.type) {
          case "teamTitles":
            this.inactive = false;
            this.states.length = 0;
            this.features.length = 0;
            this.teamTitles = message.data.titles;
            break;
          case "states":
            message.data.pairs.forEach((pair: any) => this.addPair(pair));
            break;
          case "state":
            this.addPair(message.data.pair);
            break;
        }
      });
      _ngZone.runOutsideAngular(()=>
        timer(0, 1000)
          .pipe(takeWhile(() => window.opener))
          .pipe(takeUntil(this.unsub))
          .subscribe({
            next: () => window.opener.postMessage({ type: this.teamTitles.length === 0 ? "ready" : "waiting" }, "*"),
            complete: () => this.inactive = true
          }));
  }
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
  addPair(pair: { state: IGameState, annotation: any }) {
    const index = this.states.length;
    this.features[index] = {
      open: false,
      annotate: true,
      annotation: pair.annotation
    };
    this.states[index] = pair.state;
  }
  turnTeamTitle(state: IGameState) {
    return this.teamTitles[state.teams.findIndex(team => team.$T)];
  }
  toJson(value: any, feature: IFeature) {
    return annotatedJson(value,feature.annotate ? feature.annotation : undefined,!feature.open);
  }
  teamClass(teamIndex: number, state: IGameState) {
    if (state.teams[teamIndex].$T) return "team turn";
    if (state.teams[teamIndex].$P === false) return "team notPlaying";
    return "team";
  }
  goToMove(moveNumber: number, teamIndex: number) {
    window.opener && window.opener.postMessage({ type: "goToMove", moveNumber: moveNumber, teamIndex: teamIndex }, "*");
  }
}
