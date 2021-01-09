import { NgModule } from '@angular/core';

import { SvgDialogModule, SvgDialogService } from '@packageforge/svg-dialog';
import { TemplateProjectionModule } from '@packageforge/template-projection';
import { CovertOpsDialogComponent } from './covert-ops-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    TemplateProjectionModule,
    MatButtonModule,
    SvgDialogModule
  ],
  declarations: [
    CovertOpsDialogComponent,
  ],
  entryComponents: [
    CovertOpsDialogComponent,
  ],
  providers: [
    SvgDialogService
  ]
})
export class CovertOpsDialogModule { }
