import { Card } from "./types";
import { generateCutDeck, generateWholeDeck } from "./utils";

test("generateWholeDeck generates array of 33 elements with numbers 3 through to 35", () => {
  const [first, ...rest] = generateWholeDeck();
  expect(rest).toHaveLength(32); // excluding first
  let prevValue = first;
  for (let card of rest) {
    expect(typeof card).toBe("number");
    expect(card).toBeGreaterThanOrEqual(3);
    expect(card).toBeLessThanOrEqual(35);
    expect(card).toBe(prevValue + 1);
    prevValue = card;
  }
});

test("generateCutDeck generates array of 24 elements with unique numbers in range 3 through to 35", () => {
  const deck = generateCutDeck();
  expect(deck).toHaveLength(24);
  const iteratedCards: Card[] = [];
  for (let card of deck) {
    expect(typeof card).toBe("number");
    expect(card).toBeGreaterThanOrEqual(1);
    expect(card).toBeLessThanOrEqual(35);
    expect(iteratedCards).not.toContain(card);
    iteratedCards.push(card);
  }
});
