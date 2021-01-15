import { Component, Input } from '@angular/core';
import { TestGameService } from './test-game.service';

@Component({
  selector: 'gamesbyemail-base-testgame',
  templateUrl: './test-game.component.html',
  styleUrls: ['./test-game.component.css']
})
export class TestGameComponent {
  @Input("service") service!:TestGameService
}
