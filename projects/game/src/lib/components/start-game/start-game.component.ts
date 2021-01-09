import { Component, Input } from '@angular/core';
import { teamConfigs } from './team-configs';
import { IMe, IStartTeamConfig } from '@gamesbyemail/base';
import { deepCopy } from '@packageforge/deep-copy';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-startgame',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  @Input() me!: IMe;
  teamConfigs: IStartTeamConfig[] = deepCopy(teamConfigs);


}
