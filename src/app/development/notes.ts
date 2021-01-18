export const notes=
`Terror In Europe development notes:

Controlling rolls: When rolling for Combat Ops, Combat, or Tokens, the dice can be controlled.
  * Covert Ops:
      Operatives: Press and hold a 1-6 key on your keyboard as you click the Roll button.
  * Combat:
      Operatives: Press and hold a 1-6 key on your keyboard as you click the Roll button.
      Terrorist: Press and hold a q-y key on your keyboard as you click the Roll button.
      Combat Break: Press and hold the \` key (left of the 1 key) and no others as you click the Roll button.
      Damage Operatives: Press and hold the \` key and a 1-6 key to damage the operative by that exact amount.
      Damage Terrorist: Press and hold the \` key and a q-y key to damage the terrorist by that exact amount.
  * Revealing Tokens:
     Tokens are revealed at the end of the Informant Network's turn. Press and hold a 1-6 key when completing
     their turn to roll for the upcoming token reveal.

This is a development page. Games here are not saved in a database, nor can they be played by multiple 
people across a network. They exist in this browser and nowhere else. The Start Game and Join Game
forms do not operate, they are only for development and testing.

Current games persist across browser refreshes by saving data in browser local storage. When refreshing the
browser, it should return to the last move of the game being played.
   * To restart a game from the beginning, press the Reset button.
   * To save a game permanently to play later:
       1. Press the Export button, which puts the game data on the clipboard.
       2. Open a text document in a simple editor, like Notepad.
       3. Paste the game data into that text document.
       4. Save that document somewhere on your computer.
   * To restore a previously saved game:
       1. Open the text document with the game data.
       2. Select the entire game data, from the first '{' to the last '}' characters.
       3. Copy that data to the clipboard.
       4. Press the Import button, which opens a prompt box.
       5. Paste the game data into the text field in the prompt box. 
       6. Press the OK button in the prompt box. The game will load to the last move as the turn player.
  
Click the State Browser button to open a new window that shows the game state history. Click a team
button to see the game at that point as that player would have seen it. The player whose turn it 
is at that point has a green button. If you choose that team and play a move, the states past that
point will be deleted, and the game will resume from there.

Be careful when choosing the last move of the Informant Network's turn, as that move is automatic and will 
immediately submit again, deleting all moves past that point.
`;