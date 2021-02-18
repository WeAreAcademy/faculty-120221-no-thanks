import riduce from "riduce";
import { initialState } from "./state";

const [reducer, actions] = riduce(initialState);

export { reducer, actions };
