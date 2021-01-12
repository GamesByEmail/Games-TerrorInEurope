import { Trap } from './trap';
import { Recruit } from './recruit';
import { Bomb } from './bomb';
import { Marker } from './marker';
import { Unknown } from './unknown';
import { ETokenResult, ETokenType, ETokenVisibility, ITokenState } from '../../team-state';
import { Game } from '../../game';

export function createToken(game: Game, state: ITokenState | ETokenType) {
  if (typeof (state) === "string")
    state = {
      t: state,
      c: -1,
      a: 0,
      r: ETokenResult.UNDEFINED,
      v: ETokenVisibility.HIDDEN
    };
  switch (state.t) {
    case ETokenType.TRAP: return new Trap(game, state);
    case ETokenType.BOMB: return new Bomb(game, state);
    case ETokenType.RECRUIT: return new Recruit(game, state);
    case ETokenType.MARKER: return new Marker(game, state);
    case ETokenType.UNKNOWN: return new Unknown(game, state);
  }
  throw ("Bad piece type char: '" + state.c + "'");
}
