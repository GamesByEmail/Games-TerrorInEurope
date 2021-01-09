import { IStartTeamConfig, IStartPlayer } from '@gamesbyemail/base';

const gameTitle = "Terror In Europe Game";
const players: IStartPlayer[] = [
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  }
];

export const teamConfigs: IStartTeamConfig[] = [
  {
    title: gameTitle,
    teams: [
      {
        title: "Terrorist",
        player: players[0]
      }, {
        title: "Secret Agents",
        player: players[1]
      }, {
        title: "Bomb Squad",
        player: players[2]
      }, {
        title: "Special Forces",
        player: players[3]
      }, {
        title: "Informant Network",
        player: players[4]
      }
    ]
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Terrorist",
        player: players[0]
      }, {
        title: "Secret Agents",
        player: players[1]
      }, {
        title: "Bomb Squad",
        player: players[2]
      }, {
        title: "Special Forces/Informant Network",
        player: players[3]
      }
    ]
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Terrorist",
        player: players[0]
      }, {
        title: "Secret Agents/Bomb Squad",
        player: players[1]
      }, {
        title: "Special Forces/Informant Network",
        player: players[2]
      }
    ]
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Terrorist",
        player: players[0]
      }, {
        title: "All Operatives",
        player: players[1]
      }
    ]
  }
];