import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IGameState } from 'projects/game/src/lib/game/game';
import { Subject, timer } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'state-browser',
  templateUrl: './state-browser.component.html',
  styleUrls: ['./state-browser.component.css'],
  host : {"[class]":"inactive ? 'inactive' : ''"}
})
export class StateBrowserComponent implements OnDestroy {
  unsub = new Subject()
  states: IGameState[] = []
  open: boolean[] = []
  teamTitles: string[] = []
  inactive = true
  constructor(titleService: Title) {
    titleService.setTitle(titleService.getTitle() + " - State Browser");
    fromEvent<MessageEvent>(window, "message")
      .pipe(filter(event => typeof (event.data.type) === "string"))
      .pipe(takeUntil(this.unsub))
      .subscribe(message => {
        switch (message.data.type) {
          case "teamTitles":
            this.inactive = false;
            this.states.length = 0;
            this.teamTitles = message.data.titles;
            break;
          case "state":
            this.states.push(message.data.state)
            break;
        }
      });
    timer(0, 1000)
      .pipe(takeWhile(() => window.opener))
      .pipe(takeUntil(this.unsub))
      .subscribe({
        next: () => window.opener.postMessage({ type: this.teamTitles.length === 0 ? "ready" : "waiting" }, "*"),
        complete: () => this.inactive = true
      });
  }
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
  turnTeamTitle(state: IGameState) {
    return this.teamTitles[state.teams.findIndex(team => team.$T)];
  }
  toJson(value: any, open: boolean) {
    let json = JSON.stringify(value, null, 2);
    if (!open)
      json = json.replace(/\s/g, "").replace(/"([^"]+)":/g, function ($0, $1) {
        return $1 + ":";
      });
    return json;
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
