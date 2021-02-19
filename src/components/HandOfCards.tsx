import { Card } from "../state/types";
import CardView from "./CardView";
import { sortCards } from "../state/utils";

interface Props {
  cards: Card[];
}

function HandOfCards({ cards }: Props) {
  return (
    <div className="hand-of-cards">
      Cards
      {sortCards(cards).map((card) => (
        <CardView numberOnCard={card} />
      ))}
    </div>
  );
}

export default HandOfCards;
