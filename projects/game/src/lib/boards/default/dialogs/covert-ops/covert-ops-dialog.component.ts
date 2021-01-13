import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';
import { CovertOpToken } from 'projects/game/src/lib/game/pieces/token/token';
import { Team } from 'projects/game/src/lib/game/team';
import { ETokenType } from 'projects/game/src/lib/game/team-state';
import { ICovertOpsDialogData, ICovertOpsDialogResult } from './covert-ops-dialog.service';

@Component({
  selector: "svg[gbe-games-terrorInEurope-covert-ops-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './covert-ops-dialog.component.svg',
  styleUrls: ['./covert-ops-dialog.component.css']
})
export class CovertOpsDialogComponent {
  rolls?: number[]
  operative?: Team
  token: CovertOpToken
  constructor(public dialogRef: SvgDialogRef<ICovertOpsDialogResult | undefined>, @Inject(SVG_DIALOG_DATA) data: ICovertOpsDialogData) {
    this.operative = data.operative;
    this.token = data.token;
    this.rolls = this.operative ? this.operative.getRolls() : undefined;
  }
  pieceHref(operative: boolean = false) {
    if (!operative)
      return this.token.svgId();
    return this.operative ? this.operative.meepleId : "";
  }
  dieHref(index: number) {
    if (!this.rolls || this.rolls.length <= index)
      return "";
    return "#Die" + this.rolls[index];
  }
  dieStyle(index: number) {
    if (!this.rolls || this.rolls.length <= index)
      return "";
    if (index > 0)
      return ";fill:rgb(125,125,125);color:rgb(0,0,0);opacity:0.5;";
    const miss = this.token.type === ETokenType.TRAP ? 0 : 3;
    const critical = this.operative ? (this.token.type === ETokenType.TRAP ? (this.operative.strength === 0 ? 0 : 7) : 6) : 7;
    if (this.rolls[index] <= miss)
      return ";fill:rgb(255,255,255);color:rgb(0,0,0);";
    if (this.rolls[index] >= critical)
      return ";fill:rgb(255,0,0);color:rgb(255,255,255);";
    return ";fill:rgb(81,138,66);color:rgb(255,255,255);";
    //return ";fill:rgb(20,20,20);color:rgb(255,255,255);";
  }
  close() {
    this.dialogRef.close();
  }
  dialogSize = {
    width: 420,
    height: 435
  };
  evaluateToBoolean(value: any): boolean {
    if (typeof (value) === "string" && value)
      return ((this.operative && this.operative.id === value) || this.token.svgId() === value);
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
    return this.operative && this.operative.meepleTitle + (possessive ? (this.operative.meepleTitle.endsWith('s') ? '\'' : '\'s') : "");
  }
  operativeStrength() {
    return this.operative && this.operative.strength;
  }
  viktoryPoints(count?: number) {
    if (typeof (count) === "number")
      return count + " VIKTORY " + this.pluralForm("point",count);
    return "VIKTORY point";
  }
  pluralForm(word: string, test?: number) {
    if (typeof (test) === "number")
      return word + (test === 1 ? "" : "s");
    if (this.operative && this.operative.meepleTitle.endsWith('s'))
      switch (word) {
        case 'is': return 'are';
        case 'was': return 'were';
        case 'has': return 'have';
      }
    return word;
  }
}
