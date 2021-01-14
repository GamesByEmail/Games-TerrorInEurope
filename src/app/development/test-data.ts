import {
  IStartGame,
  testMes
} from '@gamesbyemail/base';


export const testData: { [key: string]: IStartGame } = {
  terrorInEurope: {
    title: "Terror In Europe game",
    teams: [
      {
        title: "Terrorist",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "All Operatives",
        player: {
          user: undefined
        }
      }
    ],
    options: {}
  }
};
