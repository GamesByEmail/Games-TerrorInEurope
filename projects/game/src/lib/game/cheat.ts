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
export function maybeTie(rolls: number[]) {
  if (findDieFill('`')) {
    rolls[0] = 5 - rolls[1];
  }
}

