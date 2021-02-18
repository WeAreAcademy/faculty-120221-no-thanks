import { Card } from "./types";
import { generateCutDeck, generateWholeDeck } from "./utils";

test("generateWholeDeck generates array of 35 elements with numbers 1 through to 35", () => {
  const [first, ...rest] = generateWholeDeck();
  let prevValue = first;
  for (let card of rest) {
    expect(typeof card).toBe("number");
    expect(card).toBeGreaterThanOrEqual(1);
    expect(card).toBeLessThanOrEqual(35);
    expect(card).toBe(first + 1);
    prevValue = card;
  }
});

test("generateCutDeck generates array of 32 elements with unique numbers 1 through to 35", () => {
  const deck = generateCutDeck();
  const iteratedCards: Card[] = [];
  for (let card of deck) {
    expect(typeof card).toBe("number");
    expect(card).toBeGreaterThanOrEqual(1);
    expect(card).toBeLessThanOrEqual(35);
    expect(iteratedCards).not.toContain(card);
    iteratedCards.push(card);
  }
});
