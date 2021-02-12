import React from "react";
import CardFrame from "./atoms/CardFrame";
import { Card } from "../game/types";

interface Props {
  cards: Card[];
}

export default function GameDeck({ cards }: Props) {
  return <CardFrame>{cards.length} cards left in the deck</CardFrame>;
}
