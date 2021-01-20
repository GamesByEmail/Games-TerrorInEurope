
import { annotate } from '@packageforge/annotated-json';
import { Game, IGameState } from './game';
import { ETokenResult, ETokenType, ETokenVisibility, ITerroristState, ITokenState } from './team-state';

export function annotateGameState(game: Game, gameState: IGameState) {
  return annotate("",
    "moveNumber", "",
    "teams", gameState.teams.map((teamState, index) => annotateTeamState(game, teamState as ITerroristState, index))
  );
}
function annotateTeamState(game: Game, teamState: ITerroristState, index: number) {
  return annotate(teamNameAnnotation(teamState, index),
    "$T", teamState.$T ? "OUR TURN" : "NOT OUR TURN",
    "c", annotateCityName(game, teamState.c),
    "v", "VIKTORY Points: " + teamState.v,
    "s", "Strength: " + teamState.s,
    "a", "Last Token Reveal Move Number",
    "r", "Rolls: " + teamState.r?.join(","),
    "t", "Public Tokens", annotateTokenStates(game, teamState.t),
    "$_", "**** PRIVATE ****",
    ["$_", 'c'], annotateCityName(game, teamState.$_?.c),
    ["$_", 't'], "Private Tokens", annotateTokenStates(game, teamState.$_?.t)
  );
}
const teamNames = ["Secret Agents", "Bomb Squad", "Special Forces", "Informant Network", "Terrorist"];
function teamNameAnnotation(teamState: ITerroristState, index: number) {
  let anno = teamNames[index];
  if (index === 4)
    if (typeof (teamState.$_?.c) === "number")
      if (typeof (teamState.c) === "number" && teamState.c >= 0)
        anno += ", location known";
      else
        anno += ", location unknown";
    else
      anno += " - NOT PLACED";
  return anno;
}
function annotateCityName(game: Game, index?: number) {
  if (typeof (index) !== "number")
    return "";
  return "City: " + (index >= 0 ? game.board.territories[index!].title : "- NOT PLACED");
}
function annotateTokenStates(game: Game, tokenStates?: ITokenState[]) {
  if (!tokenStates)
    return;
  return tokenStates.map((tokenState) => annotateTokenState(game, tokenState));
}

function annotateTokenState(game: Game, tokenState: ITokenState) {
  return annotate(tokenType(tokenState.t as ETokenType) + " Token",
    "t", "Type: " + tokenType(tokenState.t as ETokenType),
    "c", annotateCityName(game, tokenState.c),
    "a", "Age: " + tokenState.a,
    "v", "Visibilty: " + tokenVisibility(tokenState.v),
    "r", "Result: " + tokenResult(tokenState.r)
  );
}
function tokenType(type: ETokenType) {
  switch (type) {
    case ETokenType.BOMB: return "Bomb";
    case ETokenType.RECRUIT: return "Recruit";
    case ETokenType.TRAP: return "Trap";
    case ETokenType.MARKER: return "Marker";
    case ETokenType.UNKNOWN: return "Unknown";
  }
  return;
}
function tokenVisibility(type: ETokenVisibility) {
  switch (type) {
    case ETokenVisibility.HIDDEN: return "Hidden";
    case ETokenVisibility.EXISTANCE: return "Existance";
    case ETokenVisibility.VISIBLE: return "Visible";
  }
}
function tokenResult(type: ETokenResult) {
  switch (type) {
    case ETokenResult.UNDEFINED: return "Unresolved";
    case ETokenResult.AGED: return "Aged";
    case ETokenResult.WON: return "Won";
    case ETokenResult.LOST: return "Lost";
  }
}