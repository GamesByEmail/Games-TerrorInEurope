import { Component, Input } from '@angular/core';
import { Game } from '../../game/game';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  @Input("game") game!: Game;
}
