import { Card } from "./types";
import {
  calculateCardTotal,
  findStartingChipCount,
  generateCutDeck,
  generateWholeDeck,
} from "./utils";

describe("calculateCardTotal", () => {
  it("only scores the lowest card in a consecutive sequence", () => {
    expect(calculateCardTotal([3])).toBe(3);
    expect(calculateCardTotal([3, 4])).toBe(3);
    expect(calculateCardTotal([3, 4, 5])).toBe(3);
    expect(calculateCardTotal([3, 4, 5, 7])).toBe(10);
    expect(calculateCardTotal([3, 4, 5, 7, 8])).toBe(10);
  });
});

describe("findStartingChipCount", () => {
  it("throws errors on < 3 and > 7 playerCount", () => {
    const testCases = [-4, 0, 1, 2, 8, 9, 100];
    for (let testCase of testCases) {
      expect(() => findStartingChipCount(testCase)).toThrowError();
    }
  });
});

describe("generateCutDeck", () => {
  it("generates array of 24 elements with unique numbers in range 3 through to 35", () => {
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
});

describe("generateWholeDeck", () => {
  it("generates array of 33 elements with numbers 3 through to 35", () => {
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
});
