import { Component, OnInit } from '@angular/core';
import { IGameData } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState } from '../../game/game';
import { TeamId } from '../../game/team-id';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  game: Game = new Game();
  constructor() {
  }

  ngOnInit() {
    let gameData: IGameData<IGameOptions, IGameState, TeamId> = {
      over: false,
      players: [
        { title: "David", id: "ASDFASDF" },
        { title: "Jennifer", id: "ASDFASDF" },
        { title: "Jim", id: "ASDFASDF" },
        { title: "Malvin", id: "ASDFASDF" },
        { title: "Falken", id: "ASDFASDF" }
      ],
      states: [
        {
          moveNumber: 0,
          board: "",
          teams: [
            '@',
            '',
            '',
            '',
            ''
          ],
          moves: []
        }
      ]
    };
    this.game.setGameData(gameData);
    return;
    this.game.setState(
      {
        "moveNumber": 12,
        "board": "6#r0&T|7#A&B&F|8#t2|9#b1|",
        "teams": [
          "@6",
          "6",
          "6",
          "6",
          "12"
        ],
        "moves": []
      }
    );
  }
}
