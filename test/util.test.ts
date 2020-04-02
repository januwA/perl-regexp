import { regexp2String,hasX } from "../src/util";

// λ npm t -- ./test/util.test.ts
describe("Utils Test", () => {
  it("regexp2String test", () => {
    expect(regexp2String(/a/)).toBe("a");
    expect(regexp2String(/a/gi)).toBe("a");
  });

  it("hasX test", () => {
    expect(hasX('xig')).toBe(true);
    expect(hasX('ig')).toBe(false);
    expect(hasX('')).toBe(false);
  });
});
