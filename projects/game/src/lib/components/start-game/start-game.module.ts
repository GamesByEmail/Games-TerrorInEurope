import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

import { StartGameModule as BaseStartGameModule, OptionTitleModule } from '@gamesbyemail/base';

import { StartGameComponent } from './start-game.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseStartGameModule,
    OptionTitleModule,
    MatExpansionModule,
    MatRadioModule
  ],
  declarations: [
    StartGameComponent
  ],
  exports: [
    StartGameComponent
  ]
})
export class StartGameModule {
}
