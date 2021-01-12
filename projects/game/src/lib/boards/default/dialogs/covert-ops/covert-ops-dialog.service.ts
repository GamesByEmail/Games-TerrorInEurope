import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService, SvgDialogRef } from '@packageforge/svg-dialog';
import { CovertOpToken } from 'projects/game/src/lib/game/pieces/token/token';
import { Team } from 'projects/game/src/lib/game/team';
import { CovertOpsDialogComponent } from './covert-ops-dialog.component';

export interface ICovertOpsDialogData {
  operative?: Team
  token: CovertOpToken
}
export type ICovertOpsDialogResult = undefined;

@Injectable({
  providedIn: 'root'
})
export class CovertOpsDialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, data: ICovertOpsDialogData, overlay: ElementRef<SVGElement>): SvgDialogRef<ICovertOpsDialogResult | undefined> {
    return this.svgDialogService.open<ICovertOpsDialogResult | undefined>(outlet, CovertOpsDialogComponent, data, overlay);
  }
}
