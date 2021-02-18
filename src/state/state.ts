import { NoThanksGameState } from "./types";

export const initialState: NoThanksGameState = {
  players: [],
  deck: [],
  active: {
    chips: 0,
    playerIndex: undefined,
    card: undefined,
  },
};
