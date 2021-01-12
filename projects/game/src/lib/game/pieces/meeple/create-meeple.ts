import { Game } from '../../game';
import { TeamId } from '../../team-id';
import { Team } from '../../team';
import { SecretAgents } from './secret-agents';
import { BombSquad } from './bomb-squad';
import { SpecialForces } from './special-forces';
import { Terrorist } from './terrorist';

export function createMeeple(game: Game, team: Team) {
  switch (team.id) {
    case TeamId.SecretAgents: return new SecretAgents(game,team);
    case TeamId.BombSquad: return new BombSquad(game,team);
    case TeamId.SpecialForces: return new SpecialForces(game,team);
    case TeamId.Terrorist: return new Terrorist(game,team);
  }
  throw ("Bad meeple type id: '" + team.id + "'");
}
