import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateProjectionModule } from '@packageforge/template-projection';

import { BindElementModule, BoardService } from '@gamesbyemail/base';

import { BoardComponent } from './board/board.component';
import { LogComponent } from './log/log.component';
import { PiecesComponent } from './pieces/pieces.component';
import { EntriesComponent } from './log/entries/entries.component';
import { CovertOpsDialogModule } from './dialogs/covert-ops/covert-ops-dialog.module';
import { CombatDialogModule } from './dialogs/combat/combat-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    TemplateProjectionModule,
    BindElementModule,
    CovertOpsDialogModule,
    CombatDialogModule
  ],
  declarations: [
    BoardComponent,
    LogComponent,
    PiecesComponent,
    EntriesComponent
  ],
  exports: [
    BoardComponent,
    LogComponent,
    PiecesComponent
  ],
  providers: [
    BoardService
  ]
})
export class BoardModule {
}
