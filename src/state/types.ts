export interface NoThanksGameState {
  /** ordered by turn order */
  players: Player[];
  /** 0th element is top of deck */
  deck: Card[];
  active: NoThanksActiveArea;
}

export interface Player {
  name: string;
  chips: number;
  cards: Card[];
}

export interface NoThanksActiveArea {
  chips: number;
  card: Card | undefined;
  /**
   * index of the active player if there is one
   */
  playerIndex: number | undefined;
}

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
  | 17
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
