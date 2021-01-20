import { Component, NgZone, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IGameState } from 'projects/game/src/lib/game/game';
import { Subject, timer, fromEvent } from 'rxjs';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';
import { annotatedJson } from '@packageforge/annotated-json';

interface IFeature {
  open: boolean
  annotate: boolean
  annotation: any
  active: boolean
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
  jsonIndent = 2;
  constructor(titleService: Title, _ngZone: NgZone) {
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
            this.jsonIndent = message.data.jsonIndent;
            break;
          case "states":
            message.data.pairs.forEach((pair: any) => this.addPair(pair));
            break;
          case "state":
            this.addPair(message.data.pair);
            break;
        }
      });
    _ngZone.runOutsideAngular(() =>
      timer(0, 1000)
        .pipe(takeWhile(() => window.opener))
        .pipe(takeUntil(this.unsub))
        .subscribe({
          next: () => {
            window.opener.postMessage({ type: this.teamTitles.length === 0 ? "ready" : "waiting" }, "*");
          },
          complete: () => this.inactive = true
        })
    );
  }
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
  addPair(pair: { state: IGameState, annotation: any }) {
    const moveNumber = pair.state.moveNumber;
    let index = this.states.findIndex(s => s.moveNumber === moveNumber);
    if (index >= 0)
      this.features.length = this.states.length = index;
    else
      index = this.states.length;
    this.features[index] = {
      open: false,
      annotate: true,
      annotation: pair.annotation,
      active: true
    };
    this.states[index] = pair.state;
    this.setStateActive(moveNumber);
    this.needScroll = true;
  }
  needScroll = false;
  ngAfterViewChecked() {
    if (this.needScroll) {
      this.needScroll = false;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
  setStateActive(moveNumber: number) {
    this.features.forEach((feature, index) => feature.active = (this.states[index].moveNumber === moveNumber));
  }
  turnTeamTitle(state: IGameState) {
    return this.teamTitles[state.teams.findIndex(team => team.$T)];
  }
  toJson(value: any, feature: IFeature) {
    return annotatedJson(value, feature.annotate ? feature.annotation : undefined, feature.open ? this.jsonIndent : -1);
  }
  teamClass(teamIndex: number, state: IGameState) {
    if (state.teams[teamIndex].$T) return "team turn";
    if (state.teams[teamIndex].$P === false) return "team notPlaying";
    return "team";
  }
  goToMove(moveNumber: number, teamIndex: number) {
    this.setStateActive(moveNumber);
    window.opener && window.opener.postMessage({ type: "goToMove", moveNumber: moveNumber, teamIndex: teamIndex }, "*");
  }
}
