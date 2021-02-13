import { scoreCards, sum } from "./gameFunctions";

test("sum", () => {
  expect(sum([])).toBe(0);
  expect(sum([1, 2, 10])).toBe(13);
  expect(sum([7])).toBe(7);
});

test("scoreCards", () => {
  expect(scoreCards([])).toBe(0);
  expect(scoreCards([7])).toBe(7);
  expect(scoreCards([10, 11])).toBe(10);
  expect(scoreCards([10, 20, 30])).toBe(10 + 20 + 30);
  expect(scoreCards([3, 10, 11, 12, 17, 18, 19])).toBe(3 + 10 + 17);
});
