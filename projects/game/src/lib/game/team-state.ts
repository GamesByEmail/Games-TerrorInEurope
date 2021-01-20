export type ITeamState = IOperativeState | IInformantNetworkState | ITerroristState

export interface IOperativeState {
  $T?: boolean // turn=false
  $P?: boolean // playing=true
  c: number //city index
  s: number // strength
  r?
  : number[] //rolls
}

export type LSearchType = "c" | "r" | "a";
export enum ESearchType {
  CITY = "c",
  REGION = "r",
  ALL = "a"
}

export type IInformantNetworkSearchState = IInformantNetworkCitySearchState | IInformantNetworkRegionSearchState;

export interface IInformantNetworkCitySearchState {
  t: ESearchType.CITY // search type
  d: number[] // search data
  a?: number // search answer
}
export interface IInformantNetworkRegionSearchState {
  t: ESearchType.REGION | ESearchType.ALL // search type
  d: number[] // search data
  a?: boolean // search answer
}
export interface IInformantNetworkState {
  $T?: boolean // turn=false
  $P?: boolean // playing=true
  a: number // aged move number
  r?: number[] //rolls
  s?: IInformantNetworkSearchState
}

export type LTokenType = "b" | "r" | "t" | "m" | "u";
export enum ETokenType {
  BOMB = "b",
  RECRUIT = "r",
  TRAP = "t",
  MARKER = "m",
  UNKNOWN = "u"
}
export enum ETokenVisibility {
  HIDDEN,
  EXISTANCE,
  VISIBLE
}
export enum ETokenResult {
  UNDEFINED,
  AGED,
  WON,
  LOST,
}
export interface ITokenState {
  c: number // city index
  t: LTokenType // type
  a: number //age
  v: ETokenVisibility // reveal
  r: ETokenResult // resolution
}

export interface ITerroristState {
  $T?: boolean // turn=false
  $P?: boolean // playing=true
  v: number // viktory points
  s: number // strength
  r?: number[] //rolls
  c?: number // city
  t?: ITokenState[] // public tokens
  $_?: {
    c: number // city index
    t: ITokenState[] //private tokens
  }
}
