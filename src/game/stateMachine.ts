 import { createMachine, interpret } from "xstate";

// enum States {
//   NO_ACTIVE_CARD = "no-active-card",
//   PLAYER_TURN = "player-turn",
//   SCORING_GAME = "scoring-game",
//   GAME_OVER = "game-over"
// }

// // Stateless machine definition
// // machine.transition(...) is a pure function used by the interpreter.
// const toggleMachine = createMachine({
//   id: "toggle",
//   initial: States.NO_ACTIVE_CARD,
//   context: {},
//   states: {
//     [States.NO_ACTIVE_CARD]: {},
//     [States.PLAYER_TURN]: {},
//     [States.SCORING_GAME]: {},
//     [States.GAME_OVER]: {}
//   }
// });

// // Machine instance with internal state
// const toggleService = interpret(toggleMachine)
//   .onTransition((state) => console.log(state.value))
//   .start();
// // => 'inactive'

// toggleService.send("TOGGLE");
// // => 'active'

// toggleService.send("TOGGLE");
// // => 'inactive'
