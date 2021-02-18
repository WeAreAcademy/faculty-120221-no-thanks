import { generateWholeDeck } from "./utils";

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
