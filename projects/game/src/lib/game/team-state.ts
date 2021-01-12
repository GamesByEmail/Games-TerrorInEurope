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
}

export type LTokenType = "t" | "b" | "r" | "m" | "u";
export enum ETokenType {
  TRAP = "t",
  BOMB = "b",
  RECRUIT = "r",
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
