import { Component, Input } from '@angular/core';
import { TeamId } from '../../game/team-id';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {
  @Input('team') team!: TeamId
}
