import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';
import { Team } from 'projects/game/src/lib/game/team';
import { IInformantNetworkDialogData, IInformantNetworkDialogResult } from './informant-network-dialog.service';

@Component({
  selector: "svg[gbe-games-terrorInEurope-informant-network-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './informant-network-dialog.component.svg',
  styleUrls: ['./informant-network-dialog.component.css']
})
export class InformantNetworkDialogComponent {
  rolls?: number[]
  informant: Team
  constructor(public dialogRef: SvgDialogRef<IInformantNetworkDialogResult | undefined>, @Inject(SVG_DIALOG_DATA) data: IInformantNetworkDialogData) {
    this.informant = data.informant;
    this.rolls = this.informant ? this.informant.getRolls() : undefined;
  }
  pieceHref(informant: boolean = false) {
    return this.informant ? this.informant.meepleId : "";
  }
  close() {
    this.dialogRef.close();
  }
  dialogSize = {
    width: 420,
    height: 435
  };
  evaluateToBoolean(value: any): boolean {
    return value;
  }
  showFor(value: any) {
    return this.evaluateToBoolean(value) ? '' : 'none';
  }
  hideFor(value: any) {
    return this.
      evaluateToBoolean(value) ? 'none' : '';
  }
  operativeTitle(possessive: boolean = false) {
    return this.informant && this.informant.meepleTitle + (possessive ? (this.informant.meepleTitle.endsWith('s') ? '\'' : '\'s') : "");
  }
  operativeStrength() {
    return this.informant && this.informant.strength;
  }
  viktoryPoints(count?: number) {
    if (typeof (count) === "number")
      return count + " VIKTORY " + this.pluralForm("point",count);
    return "VIKTORY point";
  }
  pluralForm(word: string, test?: number) {
    if (typeof (test) === "number")
      return word + (test === 1 ? "" : "s");
    if (this.informant && this.informant.meepleTitle.endsWith('s'))
      switch (word) {
        case 'is': return 'are';
        case 'was': return 'were';
        case 'has': return 'have';
      }
    return word;
  }
}
