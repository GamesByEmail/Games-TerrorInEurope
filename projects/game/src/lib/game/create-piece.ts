import { SecretAgents } from './pieces/meeple/secret-agents';
import { BombSquad } from './pieces/meeple/bomb-squad';
import { SpecialForces } from './pieces/meeple/special-forces';
import { Terrorist } from './pieces/meeple/terrorist';
import { Trap } from './pieces/token/trap';
import { Recruit } from './pieces/token/recruit';
import { Bomb } from './pieces/token/bomb';
import { None } from './pieces/token/none';
import { Piece } from './piece';
import { Game } from './game';

const types = [SecretAgents, BombSquad, SpecialForces, Terrorist, Trap, Recruit, Bomb, None];

export function createPiece(game: Game, state: string): Piece {
  const stateChar = state.charAt(0);
  state = state.substr(1);
  for (let i = 0; i < types.length; i++)
    if (types[i].stateChar === stateChar)
      return new types[i](game, state);
  throw ("Bad piece type char: '" + stateChar + "'");
}

export function pieceNameFromState(stateChar: string): string {
  for (let i = 0; i < types.length; i++)
    if (types[i].stateChar === stateChar)
      return types[i].type;
  throw ("Bad piece type char: '" + stateChar + "'");
}
