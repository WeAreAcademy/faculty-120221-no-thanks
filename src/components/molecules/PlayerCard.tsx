import React from "react"
import { Card, Player } from "../../game/types"
import GameCard from "../GameCard"
import Counters from "./Counters"

interface PlayerCardProps {
    player: Player,
    isActive: boolean
}
function PlayerCard({ player, isActive }: PlayerCardProps) {
    const { chips, name, cards } = player
    return (
        <div className={isActive ? "player-card active-player" : "player-card"}>
            <div className="name">{name}</div>
            <Counters n={chips} />
            {cards.length ? cards.map((card: Card) => <GameCard key={card} value={card} />) : "No cards yet"}
        </div>
    )

};

export default PlayerCard