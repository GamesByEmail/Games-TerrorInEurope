export type ITeamState = IOpsState | IInfoState | ITerrState

export interface IOpsState {
  T?: boolean
  P?: boolean
  c: number //city index
  s: number // strength
  r?: number[] //rolls
}
export interface IInfoState {
  T?: boolean
  P?: boolean
  a: number // aged move number
}

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
  t: ETokenType // type
  a: number //age
  v: ETokenVisibility // reveal
  r: ETokenResult // resolution
}

export interface ITerrState {
  T?: boolean
  P?: boolean
  v: number // viktory points
  s: number // strength
  r?: number[] //rolls
  c?: number // city
  t?: ITokenState[] // public tokens
  _?: {
    c: number // city index
    t: ITokenState[] //private tokens
  }
}
