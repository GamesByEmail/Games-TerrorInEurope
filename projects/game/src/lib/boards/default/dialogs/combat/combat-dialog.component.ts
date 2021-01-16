import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';
import { Team } from 'projects/game/src/lib/game/team';
import { ICombatDialogData, ICombatDialogResult } from './combat-dialog.service';

interface IRollStat {
  r: number
  m: number
  t: number
  d: number
  s: number
  c: Team
}

@Component({
  selector: "svg[gbe-games-terrorInEurope-combat-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './combat-dialog.component.svg',
  styleUrls: ['./combat-dialog.component.css']
})
export class CombatDialogComponent {
  dialogSize = {
    width: 420,
    height: 435
  };
  rolls?: { a: IRollStat, d: IRollStat, l?: IRollStat, t?: IRollStat, o?: IRollStat }
  attacker: Team
  defender?: Team
  defenders: [(Team | undefined), (Team | undefined), Team];
  tAttack: boolean
  combatBreak: boolean
  anotherToCombat: boolean
  readyToFight: boolean
  next: boolean
  done: boolean
  chooseDefender: boolean
  constructor(public dialogRef: SvgDialogRef<ICombatDialogResult | undefined>, @Inject(SVG_DIALOG_DATA) public data: ICombatDialogData) {
    this.attacker = this.data.attacker;
    this.defenders = <any>this.data.defenders.slice()
    while (this.defenders.length < 3)
      this.defenders.unshift(undefined);
    this.tAttack = this.attacker.isTerrorist();
    const aRolls = this.attacker.getRolls();
    if (this.tAttack && aRolls)
      this.defender = this.attacker.getDefender(this.defenders);
    this.sortDefenders();
    if (aRolls && this.defender) {
      const dRolls = this.defender.getRolls()!.slice(0, 2);
      this.rolls = {
        a: {
          r: aRolls[0],
          m: aRolls[1],
          t: aRolls[0] + aRolls[1],
          d: Math.max(0, (dRolls[0] + dRolls[1]) - (aRolls[0] + aRolls[1])),
          s: this.attacker.strength,
          c: this.attacker
        },
        d: {
          r: dRolls[0],
          m: dRolls[1],
          t: dRolls[0] + dRolls[1],
          d: Math.max(0, (aRolls[0] + aRolls[1]) - (dRolls[0] + dRolls[1])),
          s: this.defender.strength,
          c: this.defender
        }
      };
      if (this.tAttack) {
        this.rolls.t = this.rolls.a;
        this.rolls.o = this.rolls.d;
      } else {
        this.rolls.o = this.rolls.a;
        this.rolls.t = this.rolls.d;
      }
      if (this.rolls.a.d > 0)
        this.rolls.l = this.rolls.a;
      else if (this.rolls.d.d > 0)
        this.rolls.l = this.rolls.d;
    }
    this.combatBreak = this.rolls !== undefined && this.rolls.a.t === this.rolls.d.t;
    this.anotherToCombat = this.tAttack && !this.combatBreak && this.defender !== undefined && this.rolls !== undefined && this.rolls.d.s === 0 && this.defenders.find(d => d && d != this.defender && d.isAlive()) !== undefined;
    this.readyToFight = this.defender !== undefined && !this.combatBreak && this.defender.isAlive() && this.attacker.isAlive();
    this.done = !this.attacker.myTurn;
    this.chooseDefender = !this.defender || (this.defender.isDead() && this.getLiveDefenders().length > 0);
    this.next = !this.chooseDefender && !this.readyToFight && !this.done && this.rolls !== undefined;
  }
  getLiveDefenders(includingCurrent: boolean = true) {
    if (!this.defender)
      includingCurrent = true;
    return this.defenders.filter(d => d && d.isAlive() && (includingCurrent || d !== this.defender));
  }
  sortDefenders() {
    this.defenders.sort((a, b) => {
      if (!a || a === this.defender)
        return -1;
      if (!b || b === this.defender)
        return 1;
      return b.strength - a.strength;
    });
    const liveDefenders = this.getLiveDefenders(false);
    if (!this.defender && liveDefenders.length === 1)
      this.defender = liveDefenders[0];
  }
  combatant(): Team
  combatant(defenderIndex: -1): Team
  combatant(defenderIndex?: number): Team | undefined
  combatant(defenderIndex?: number) {
    if (typeof (defenderIndex) !== "number")
      return this.attacker;
    if (defenderIndex >= 0)
      return this.defenders[defenderIndex];
    return this.defenders.find(d => d)!;
  }
  combatantStrength(defenderIndex?: number) {
    const combatant = this.combatant(defenderIndex);
    if (!combatant || combatant.isDead())
      return undefined;
    return combatant.strength.toString();
  }
  combatantModifier(defenderIndex?: number) {
    const combatant = this.combatant(defenderIndex);
    if (!combatant || combatant.isDead())
      return undefined;
    const asAttacker = typeof (defenderIndex) !== "number";
    const opponent = asAttacker ? this.defenders.find(d => d)! : this.attacker;
    return combatant.getCombatModifier(opponent, combatant.city, asAttacker).toString();
  }
  combatantHref(defenderIndex?: number) {
    const combatant = this.combatant(defenderIndex);
    if (!combatant)
      return "";
    return combatant.meepleId;
  }
  combatantClass(defenderIndex: number) {
    const combatant = this.combatant(defenderIndex);
    if (!combatant || combatant === this.defender)
      return "";
    let classes="otherCombatant";
    if (this.chooseDefender && combatant.isAlive())
      classes+=" selectableCombatant";
    return classes;
  }
  combatantTransform(x:number,defenderIndex: number) {
    const combatant = this.combatant(defenderIndex);
    if (!combatant)
      return "";
    const offset = combatant === this.defender ? -15 : 0;
    return "translate(" + (x+(2 - defenderIndex!) * 20 + offset) + " 0)";
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
    const strength = index === 'a' ? this.rolls.a.s + this.rolls.a.d : this.rolls.d.s + this.rolls.d.d;
    const miss = this.rolls[o].t - this.rolls[index].m;
    const critical = miss - strength;
    if (this.rolls[index].r >= miss)
      return ";fill:rgb(255,255,255);color:rgb(0,0,0);";
    if (this.rolls[index].r <= critical)
      return ";fill:rgb(255,0,0);color:rgb(255,255,255);";
    return ";fill:rgb(81,138,66);color:rgb(255,255,255);";
  }
  defenderClick(defenderIndex: number) {
    const combatant = this.combatant(defenderIndex);
    if (combatant && combatant.isAlive() && this.chooseDefender) {
      this.defender = combatant;
      this.rolls = undefined;
      this.sortDefenders();
      this.readyToFight = true;
    }
  }
  close() {
    this.dialogRef.close(this.combatBreak ? undefined : this.defender);
  }
  eval(value: any, props?: string) {
    if (props)
      try {
        eval("value=value." + props);
      } catch (e) {
        value = "";
      }
    return value;
  }
  showFor(value: any, props?: string) {
    return this.eval(value, props) ? '' : 'none';
  }
  hideFor(value: any, props?: string) {
    return this.eval(value, props) ? 'none' : '';
  }
  viktoryPoints(count?: number) {
    if (typeof (count) === "number")
      return count + " VIKTORY " + (count === 1 ? "point" : "points");
    return "VIKTORY point";
  }
  posessive(value: string) {
    return value + (value.endsWith("s") ? "'" : "'s");
  }
  pluralForm(word: string, test?: string | number) {
    if (typeof (test) === "number")
      return word + (test === 1 ? "" : "s");
    if (test && test.endsWith('s'))
      switch (word) {
        case 'is': return 'are';
        case 'was': return 'were';
        case 'has': return 'have';
      }
    return word;
  }
}
