export type ITeamState = IOpsState | IInfoState | ITerrState

export interface IOpsState {
  $T?: boolean // turn=false
  $P?: boolean // playing=true
  c: number //city index
  s: number // strength
  r?: number[] //rolls
}
export interface IInfoState {
  $T?: boolean // turn=false
  $P?: boolean // playing=true
  a: number // aged move number
  r?: number[] //rolls
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

export interface ITerrState {
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
