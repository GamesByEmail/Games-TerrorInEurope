export enum TeamId {
  'SecretAgents' = 'SecretAgents',
  'BombSquad' = 'BombSquad',
  'SpecialForces' = 'SpecialForces',
  'InformantNetwork' = 'InformantNetwork',
  'Terrorist' = 'Terrorist'
}

export function isOperative(teamId: TeamId) {
  return teamId === TeamId.SecretAgents ||
    teamId === TeamId.BombSquad ||
    teamId === TeamId.SpecialForces ||
    teamId === TeamId.InformantNetwork;
}
export function isTerrorist(teamId: TeamId) {
  return teamId === TeamId.Terrorist;
}
const teamIds = [
  TeamId.SecretAgents,
  TeamId.BombSquad,
  TeamId.SpecialForces,
  TeamId.InformantNetwork,
  TeamId.Terrorist
];
