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
          board:undefined,
          teams: [
            {$T:true,c:-1,s:6},
            {c:-1,s:6},
            {c:-1,s:6},
            {a:0},
            {v:0,s:12}
          ],
          moves: []
        }
      ]
    };
    this.game.setGameData(gameData);
    return;

    return this.game.server.init({"moveNumber":14,"teams":[{"c":7,"s":6,"$T":true},{"c":7,"s":6},{"c":7,"s":6},{"a":13},{"v":0,"s":12,"$_":{"c":6,"t":[{"c":6,"t":"r","a":0,"v":0,"r":0},{"c":8,"t":"t","a":2,"v":0,"r":0},{"c":9,"t":"b","a":1,"v":0,"r":0}]}}],"moves":[]});
    

  }
}
