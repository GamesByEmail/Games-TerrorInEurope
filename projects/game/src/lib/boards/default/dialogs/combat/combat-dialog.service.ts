import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService, SvgDialogRef } from '@packageforge/svg-dialog';
import { Team } from 'projects/game/src/lib/game/team';
import { CombatDialogComponent } from './combat-dialog.component';

export interface ICombatDialogData {
  attacker: Team
  defenders: Team[]
}
export type ICombatDialogResult = Team;


@Injectable({
  providedIn: 'root'
})
export class CombatDialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, data: ICombatDialogData, overlay: ElementRef<SVGElement>): SvgDialogRef<ICombatDialogResult | undefined> {
    return this.svgDialogService.open<ICombatDialogResult | undefined>(outlet, CombatDialogComponent, data, overlay);
  }
}
