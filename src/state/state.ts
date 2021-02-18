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
