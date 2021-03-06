import { PerlRegExp } from "../src";

describe("PerlRegExp", () => {
  it("replace test \\u", () => {
    const p = new PerlRegExp(/ (?:- (\w) ) /, "xig");
    const r = p.replace("color-red", "\\u$1");
    expect(r).toBe("colorRed");
  });

  it("replace test \\U", () => {
    const p = new PerlRegExp(/ (?:- (\w*) ) /, "xig");
    const r = p.replace("color-red", "\\U$1");
    expect(r).toBe("colorRED");
  });
  it("replace test \\l", () => {
    const p = new PerlRegExp(/ ([A-Z]) /, "xg");
    const r = p.replace("colorRed", "-\\l$1");
    expect(r).toBe("color-red");
  });
  it("replace test \\L", () => {
    const p = new PerlRegExp(/ ([A-Z]*) /, "xg");
    const r = p.replace("color-RED", "\\L$1");
    expect(r).toBe("color-red");
  });
  it("replace test \\Q", () => {
    const p = new PerlRegExp(/([^]*)/, "xg");
    const r = p.replace("color-red", "\\Q$1");
    expect(r).toBe("color\\-red");
  });
  it("replace test Replacer", () => {
    const p = new PerlRegExp("(-)");
    const r = p.replace("color-red", (match, g1) => {
      expect(g1).toBe("-");
      return "_";
    });
    expect(r).toBe("color_red");
  });
  it("replace test $`", () => {
    const p = new PerlRegExp(/(-)/);
    const r = p.replace("color-red", "\\U$`");
    expect(r).toBe("colorCOLORred");
  });
  it("replace test $'", () => {
    const r = new PerlRegExp(/(-)/).replace("color-red", "\\U$'");
    expect(r).toBe("colorREDred");
  });
  it("replace test $&", () => {
    const p = new PerlRegExp(/(-)/);
    const r = p.replace("color-red", "$&$&");
    expect(r).toBe("color--red");
  });
  it("replace test", () => {
    const p = new PerlRegExp(/ a /g, "x");
    const r = p.replace("Ajanuw", "-");
    expect(r).toBe("Aj-nuw");
  });
  it("extend flags test", () => {
    expect(new PerlRegExp(/a/i).flags).toBe("i");
    expect(new PerlRegExp(/a/i, "gm").flags).toBe("gim");
    expect(new PerlRegExp(/a/, "igm").flags).toBe("gim");
  });
});
