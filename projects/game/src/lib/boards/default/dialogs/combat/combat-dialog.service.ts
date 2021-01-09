import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService, SvgDialogRef } from '@packageforge/svg-dialog';
import { Operative } from 'projects/game/src/lib/game/piece';
import { Terrorist } from 'projects/game/src/lib/game/pieces/meeple/terrorist';
import { CombatDialogComponent } from './combat-dialog.component';

export type ICombatDialogData = ICombatDialogDataOperativeVersusTerrorist | ICombatDialogDataTerroristVersusOperatives

export interface ICombatDialogDataOperativeVersusTerrorist {
  attacker: Operative
  defender: Terrorist
}
export interface ICombatDialogDataTerroristVersusOperatives {
  attacker: Terrorist
  defenders: Operative[]
}
export type ICombatDialogResult = Operative | Terrorist;


@Injectable({
  providedIn: 'root'
})
export class CombatDialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, data: ICombatDialogData, overlay: ElementRef<SVGElement>): SvgDialogRef<ICombatDialogResult | undefined> {
    return this.svgDialogService.open<ICombatDialogResult | undefined>(outlet, CombatDialogComponent, data, overlay);
  }
}
