export type Card =
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35;

export type PlayerName = string;

export interface Player {
  name: PlayerName;
  chips: number;
  cards: Card[];
}

export type ScoredPlayer = [Player, number];

export interface NoThanksGame {
  /** ordered by turn order */
  players: Player[];
  /** 0th element is top of deck */
  deck: Card[];
  active: ActiveGame;
}

export interface ActiveGame {
  card: Card;
  chips: number;
  /** index of the active player */
  playerIdx: number;
}
