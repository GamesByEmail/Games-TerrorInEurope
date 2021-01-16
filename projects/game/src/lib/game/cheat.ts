import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

const keysDown: string[] = []
fromEvent<KeyboardEvent>(window, "keydown")
  .pipe(map(event => event.key), filter(key => !keysDown.includes(key)))
  .subscribe(key => keysDown.push(key));

fromEvent<KeyboardEvent>(window, "keyup")
  .pipe(map(event => keysDown.indexOf(event.key)), filter(index => index >= 0))
  .subscribe(index => keysDown.splice(index, 1));

function findDieFill(keys: string) {
  for (var i = 0; i < keys.length; i++)
    if (keysDown.includes(keys.charAt(i)))
      return i + 1;
  return;
}
export function operativeDieFill() {
  return findDieFill('123456');
}
export function terroristDieFill() {
  return findDieFill('qwerty');
}
export function maybeControlDamage(aRolls: number[], dRolls: number[], aOp: boolean) {
  if (findDieFill('`')) {
    const oFill = operativeDieFill();
    const tFill = terroristDieFill();
    const oRolls = aOp ? aRolls : dRolls;
    const tRolls = aOp ? dRolls : aRolls;
    if (oFill)
      targetDamage(tRolls, oRolls, oFill);
    else if (tFill)
      targetDamage(oRolls, tRolls, tFill);
    else
      targetDamage(aRolls, dRolls, 0);
  }
}
function targetDamage(winRolls: number[], loseRolls: number[], target: number) {
  const modifier = winRolls[1] - loseRolls[1];
  let winRoll = 1;
  let loseRoll = 6;
  while (winRoll < 6 && loseRoll > 1 && (winRoll - loseRoll + modifier) < target) {
    winRoll++;
    if ((winRoll - loseRoll + modifier) < target)
      loseRoll--;
    else
      break;
  }
  winRolls[0] = winRoll;
  loseRolls[0] = loseRoll;
}