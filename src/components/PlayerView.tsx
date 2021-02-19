import classnames from "classnames";
import { Player } from "../state/types";
import { calculatePlayerScore } from "../state/utils";
import Chips from "./Chips";
import HandOfCards from "./HandOfCards";

interface Props {
  active: boolean;
  player: Player;
}

function PlayerView({ active, player }: Props) {
  return (
    <div className={classnames("player-view", { active })}>
      <h3>{player.name}</h3>
      <ul>
        <li>Score: {calculatePlayerScore(player)}</li>
        <Chips numberOfChips={player.chips} />
        <HandOfCards cards={player.cards} />
      </ul>
    </div>
  );
}

export default PlayerView;
