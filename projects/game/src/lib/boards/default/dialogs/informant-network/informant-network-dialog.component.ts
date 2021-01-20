import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';
import { Team } from 'projects/game/src/lib/game/team';
import { ESearchType, LSearchType } from 'projects/game/src/lib/game/team-state';
import { IInformantNetworkDialogData, IInformantNetworkDialogResult } from './informant-network-dialog.service';

@Component({
  selector: "svg[gbe-games-terrorInEurope-informant-network-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './informant-network-dialog.component.svg',
  styleUrls: ['./informant-network-dialog.component.css']
})
export class InformantNetworkDialogComponent {
  regionSearchable
  allSearchable
  informant: Team
  constructor(public dialogRef: SvgDialogRef<IInformantNetworkDialogResult | undefined>, @Inject(SVG_DIALOG_DATA) data: IInformantNetworkDialogData) {
    this.informant = data.informant;
    this.regionSearchable = data.regionSearchable;
    this.allSearchable = data.allSearchable;
    console.log("regionSearchable", this.regionSearchable);
    console.log("allSearchable", this.allSearchable);
  }
  close(type: LSearchType) {
    this.dialogRef.close(type as ESearchType);
  }
  dialogSize = {
    width: 540,
    height: 250
  };
}
