import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService, SvgDialogRef } from '@packageforge/svg-dialog';
import { Operative } from 'projects/game/src/lib/game/piece';
import { Token } from 'projects/game/src/lib/game/pieces/token/token';
import { CovertOpsDialogComponent } from './covert-ops-dialog.component';

export interface ICovertOpsDialogData {
  operative?: Operative
  token: Token
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
