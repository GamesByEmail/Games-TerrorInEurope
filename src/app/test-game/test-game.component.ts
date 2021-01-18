import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TestGameService } from './test-game.service';

@Component({
  selector: 'gamesbyemail-base-testgame',
  templateUrl: './test-game.component.html',
  styleUrls: ['./test-game.component.css']
})
export class TestGameComponent implements OnDestroy {
  private unsub = new Subject();
  @Input("service") public service!: TestGameService
  @Input("notes") public notes!: string
  showNotes=false;
  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }
  tempChangeTitle(button: HTMLInputElement, tempTitle: string, origTitle: string) {
    console.log(button);
    button.value = tempTitle;
    timer(1000).pipe(takeUntil(this.unsub)).subscribe(() => button.value = origTitle);
  }
  doExport(button: HTMLInputElement) {
    window.navigator.clipboard.writeText(this.service.export());
    this.tempChangeTitle(button, "Exported to Clipboard","Export");
  }
  doImport(button: HTMLInputElement) {
    const result = window.prompt("Paste game data here:", "");
    if (result) {
      this.service.import(result);
      this.tempChangeTitle(button, "Imported","Import");
    }
  }
}
