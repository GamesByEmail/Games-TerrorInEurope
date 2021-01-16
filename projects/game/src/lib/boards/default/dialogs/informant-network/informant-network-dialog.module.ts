import { NgModule } from '@angular/core';

import { SvgDialogModule, SvgDialogService } from '@packageforge/svg-dialog';
import { TemplateProjectionModule } from '@packageforge/template-projection';
import { InformantNetworkDialogComponent } from './informant-network-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    TemplateProjectionModule,
    MatButtonModule,
    SvgDialogModule
  ],
  declarations: [
    InformantNetworkDialogComponent,
  ],
  entryComponents: [
    InformantNetworkDialogComponent,
  ],
  providers: [
    SvgDialogService
  ]
})
export class InformantNetworkDialogModule { }
