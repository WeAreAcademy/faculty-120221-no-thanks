import { getFullDeck, removeCardsFromDeck } from "./deckFunctions";

test("getFullDeck", () => {
  expect(getFullDeck()).toStrictEqual([
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35
  ]);
});

test("removeCardsFromDeck", () => {
  expect(removeCardsFromDeck([3, 5, 4], 3)).toStrictEqual([]);
  expect(removeCardsFromDeck([6, 7, 8], 0)).toStrictEqual([6, 7, 8]);
  expect(removeCardsFromDeck([8, 9, 10, 11], 1).length).toBe(3);
});
