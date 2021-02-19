import { NoThanksGameState } from "./types";

export const initialState: NoThanksGameState = {
  active: {
    chips: 0,
    playerIndex: undefined,
    card: undefined,
  },
  players: [],
  deck: [],
};

export const fixedState: NoThanksGameState = {
  active: {
    chips: 3,
    playerIndex: 2,
    card: 28,
  },
  players: [
    {
      name: "Richard",
      chips: 8,
      cards: [11],
    },
    {
      name: "E",
      chips: 9,
      cards: [19, 26],
    },
    {
      name: "N",
      chips: 13,
      cards: [10, 12, 14, 23],
    },
  ],
  deck: [21, 3, 29, 35, 6, 16, 22, 18, 4, 17, 9, 34, 31, 15, 8, 33],
};
