import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService, SvgDialogRef } from '@packageforge/svg-dialog';
import { Team } from 'projects/game/src/lib/game/team';
import { ESearchType } from 'projects/game/src/lib/game/team-state';
import { InformantNetworkDialogComponent } from './informant-network-dialog.component';

export interface IInformantNetworkDialogData {
  informant: Team
  regionSearchable: boolean
  allSearchable: boolean
}
export type IInformantNetworkDialogResult = ESearchType;

@Injectable({
  providedIn: 'root'
})
export class InformantNetworkDialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, data: IInformantNetworkDialogData, overlay: ElementRef<SVGElement>): SvgDialogRef<IInformantNetworkDialogResult | undefined> {
    return this.svgDialogService.open<IInformantNetworkDialogResult | undefined>(outlet, InformantNetworkDialogComponent, data, overlay);
  }
}
