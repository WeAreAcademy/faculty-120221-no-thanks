import React from "react";
import { Card } from "../game/types";

interface Props {
  cards: Card[];
}

export default function GameDeck({ cards }: Props) {
  return (
    <div className="deck-display">
      <div className="deck">{cards.length} cards left in deck</div>
    </div>
  );
}
