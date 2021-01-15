
import { annotate } from 'src/app/state-browser/annotated-json';
import { Game, IGameState } from './game';
import { ETokenResult, ETokenType, ETokenVisibility, ITerrState, ITokenState, LTokenType } from './team-state';

export function annotateGameState(game: Game, gameState: IGameState) {
  return annotate("",
    "teams", gameState.teams.map((teamState, index) => annotateTeamState(game, teamState as ITerrState, index))
  );
}
const teamNames=["Secret Agents","Bomb Squad","Special Forces","Informant Network","Terrorist"];
function annotateTeamState(game: Game, teamState: ITerrState, index: number) {
  return annotate(teamNames[index],
    "c", annotateCityName(game, teamState.c),
    "t", annotateTokenStates(game, teamState.t),
    "$_", "**** PRIVATE ****",
    ["$_", 'c'], annotateCityName(game, teamState.$_?.c),
    ["$_", 't'], annotateTokenStates(game, teamState.$_?.t)
  );
}

function annotateCityName(game: Game, index?: number) {
  return typeof (index) === "number" && index >= 0 ? game.board.territories[index!].title : "";
}
function annotateTokenStates(game: Game, tokenStates?: ITokenState[]) {
  if (!tokenStates)
    return;
  return tokenStates.map((tokenState) => annotateTokenState(game, tokenState));
}

function annotateTokenState(game: Game, tokenState: ITokenState) {
  return annotate("", 
  "t",tokenType(tokenState.t as ETokenType),
  "c",annotateCityName(game, tokenState.c),
  "v",tokenVisibility(tokenState.v),
  "r",tokenResult(tokenState.r)
  );
}
function tokenType(type:ETokenType){
  switch (type){
    case ETokenType.BOMB : return "Bomb";
    case ETokenType.RECRUIT : return "Recruit";
    case ETokenType.TRAP : return "Trap";
    case ETokenType.MARKER : return "Marker";
    case ETokenType.UNKNOWN : return "Unknown";
  }
  return;
}
function tokenVisibility(type:ETokenVisibility){
  switch (type){
    case ETokenVisibility.HIDDEN : return "Hidden";
    case ETokenVisibility.EXISTANCE : return "Existance";
    case ETokenVisibility.VISIBLE : return "Visible";
  }
}
function tokenResult(type:ETokenResult){
  switch (type){
    case ETokenResult.UNDEFINED : return "Undefined";
    case ETokenResult.AGED : return "Aged";
    case ETokenResult.WON : return "Won";
    case ETokenResult.LOST : return "Lost";
  }
}