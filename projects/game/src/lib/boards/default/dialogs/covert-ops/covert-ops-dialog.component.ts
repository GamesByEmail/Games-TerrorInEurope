import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';
import { ICovertOpsDialogData, ICovertOpsDialogResult } from './covert-ops-dialog.service';

@Component({
  selector: "svg[gbe-games-terrorInEurope-covert-ops-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './covert-ops-dialog.component.svg',
  styleUrls: ['./covert-ops-dialog.component.css']
})
export class CovertOpsDialogComponent {
  rolls?: number[]
  constructor(public dialogRef: SvgDialogRef<ICovertOpsDialogResult | undefined>, @Inject(SVG_DIALOG_DATA) public data: ICovertOpsDialogData) {
    this.rolls = this.data.operative ? this.data.operative.team.getRolls() : undefined;
  }
  pieceHref(operative: boolean = false) {
    if (!operative)
      return '#' + this.data.token.templateKey.type;
    return this.data.operative ? ('#' + this.data.operative.templateKey.type) + (this.data.operative.team.strength === 0 ? "Dead" : "") : "";
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
    const miss = this.data.token.type === "Trap" ? 0 : 3;
    const critical = this.data.operative ? (this.data.token.type === "Trap" ? this.data.operative.team.strength : 6) : 7;
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
    height: 405
  };
  evaluateToBoolean(value: any): boolean {
    if (typeof (value) === "string" && value)
      return ((this.data.operative && this.data.operative.type === value) || this.data.token.type === value);
    return value;
  }
  showFor(value: any) {
    return this.evaluateToBoolean(value) ? '' : 'none';
  }
  hideFor(value: any) {
    return this.evaluateToBoolean(value) ? 'none' : '';
  }
  viktoryPoints(count?: number) {
    if (typeof (count) === "number")
      return count + " VIKTORY " + (count === 1 ? "point" : "points");
    return "VIKTORY point";
  }
}
