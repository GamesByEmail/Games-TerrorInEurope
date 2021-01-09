import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { JoinGameModule as BaseJoinGameModule, OptionTitleModule } from '@gamesbyemail/base';

import { JoinGameComponent } from './join-game.component';


@NgModule({
  imports: [
    CommonModule,
    BaseJoinGameModule,
    OptionTitleModule,
    MatExpansionModule
  ],
  declarations: [
    JoinGameComponent
  ],
  exports: [
    JoinGameComponent
  ]
})
export class JoinGameModule {
}
