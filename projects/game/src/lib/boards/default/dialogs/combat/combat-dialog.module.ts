import { NgModule } from '@angular/core';

import { SvgDialogModule, SvgDialogService } from '@packageforge/svg-dialog';
import { TemplateProjectionModule } from '@packageforge/template-projection';
import { CombatDialogComponent } from './combat-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    TemplateProjectionModule,
    MatButtonModule,
    SvgDialogModule
  ],
  declarations: [
    CombatDialogComponent,
  ],
  entryComponents: [
    CombatDialogComponent,
  ],
  providers: [
    SvgDialogService
  ]
})
export class CombatDialogModule { }
