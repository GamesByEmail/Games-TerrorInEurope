import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';
import { Operative } from 'projects/game/src/lib/game/piece';
import { Terrorist } from 'projects/game/src/lib/game/pieces/meeple/terrorist';
import { ICombatDialogData, ICombatDialogDataOperativeVersusTerrorist, ICombatDialogResult } from './combat-dialog.service';

function isICombatDialogDataOperativeVersusTerrorist(data: ICombatDialogData): data is ICombatDialogDataOperativeVersusTerrorist {
  return (<any>data).defender;
}

interface IRollStat {
  r: number
  m: number
  t: number
  d: number
  s: number
}

@Component({
  selector: "svg[gbe-games-terrorInEurope-combat-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './combat-dialog.component.svg',
  styleUrls: ['./combat-dialog.component.css']
})
export class CombatDialogComponent {
  rolls?: { a: IRollStat, d: IRollStat, t: IRollStat, o: IRollStat }
  defender?: Operative | Terrorist
  tAttack: boolean
  constructor(public dialogRef: SvgDialogRef<ICombatDialogResult | undefined>, @Inject(SVG_DIALOG_DATA) public data: ICombatDialogData) {
    const aRolls = this.data.attacker.team.getRolls();
    if (isICombatDialogDataOperativeVersusTerrorist(this.data)) {
      this.tAttack = false;
      this.defender = this.data.defender;
    } else {
      this.tAttack = true;
      if (aRolls)
        this.defender = this.data.attacker.team.getDefender(this.data.defenders);
      this.data.defenders = this.data.defenders.slice().sort((a, b) => {
        if (a === this.defender)
          return -1;
        if (b === this.defender)
          return 1;
        return a.team.strength - b.team.strength;
      });
    }
    if (aRolls && this.defender) {
      const dRolls = this.defender.team.getRolls()!.slice(0, 2);
      this.rolls = {
        a: {
          r: aRolls[0],
          m: aRolls[1],
          t: aRolls[0] + aRolls[1],
          d: Math.max(0, (aRolls[0] + aRolls[1]) - (dRolls[0] + dRolls[1])),
          s: this.data.attacker.team.strength
        },
        d: {
          r: dRolls[0],
          m: dRolls[1],
          t: dRolls[0] + dRolls[1],
          d: Math.max(0, (dRolls[0] + dRolls[1]) - (aRolls[0] + aRolls[1])),
          s: this.defender.team.strength
        },
        t: <any>undefined,
        o: <any>undefined
      };
      if (this.tAttack) {
        this.rolls.t = this.rolls.a;
        this.rolls.o = this.rolls.d;
      } else {
        this.rolls.o = this.rolls.a;
        this.rolls.t = this.rolls.d;
      }
    }
  }
  defenderIndexToPlace(defenderIndex: number) {
    if (isICombatDialogDataOperativeVersusTerrorist(this.data))
      return 2;
    return defenderIndex + (3 - this.data.defenders.length);
  }
  meepleHref(defenderPlace?: number) {
    if (typeof (defenderPlace) === "number")
      if (isICombatDialogDataOperativeVersusTerrorist(this.data))
        return defenderPlace === 2 ? '#' + this.data.defender.templateKey.type : "";
      else {
        const defenderIndex = defenderPlace - (3 - this.data.defenders.length);
        return defenderIndex >= 0 && defenderIndex < this.data.defenders.length ? '#' + this.data.defenders[defenderIndex].templateKey.type : "";
      }
    return '#' + this.data.attacker.templateKey.type;
  }
  meepleStyle(defenderPlace?: number) {
    if (typeof (defenderPlace) === "number")
      if (isICombatDialogDataOperativeVersusTerrorist(this.data))
        return "";
      else {
        const defenderIndex = defenderPlace - (3 - this.data.defenders.length);
        return !this.defender || defenderIndex === 0 ? '' : "opacity:0.7";
      }
    return "";
  }
  dieHref(index: 'a' | 'd') {
    if (!this.rolls)
      return "";
    return "#Die" + this.rolls[index].r;
  }
  dieStyle(index: 'a' | 'd') {
    if (!this.rolls)
      return "";
    const o = index === 'a' ? 'd' : 'a';
    const strength = index === 'a' ? this.data.attacker.team.strength : this.defender!.team.strength;
    const miss = this.rolls[o].t - this.rolls[index].m;
    const critical = miss + strength;
    if (this.rolls[index].r <= miss)
      return ";fill:rgb(255,255,255);color:rgb(0,0,0);";
    if (this.rolls[index].r >= critical)
      return ";fill:rgb(255,0,0);color:rgb(255,255,255);";
    return ";fill:rgb(81,138,66);color:rgb(255,255,255);";
    //return ";fill:rgb(20,20,20);color:rgb(255,255,255);";
  }
  close() {
    this.dialogRef.close(this.defender);
  }
  dialogSize = {
    width: 420,
    height: 405
  };
  showFor(value: any) {
    return value ? '' : 'none';
  }
  hideFor(value: any) {
    return value ? 'none' : '';
  }
  viktoryPoints(count?: number) {
    if (typeof (count) === "number")
      return count + " VIKTORY " + (count === 1 ? "point" : "points");
    return "VIKTORY point";
  }
}
