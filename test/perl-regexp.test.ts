import { PerlRegExp } from "../src";
describe("PerlRegExp", () => {
  it("replace test \\u", () => {
    const p = new PerlRegExp(" (?:- (\\w) ) ", "xig");
    const r = p.replace("color-red", "\\u$1");
    expect(r).toBe("colorRed");
    expect(/(ajanuw)/.replace("hello ajanuw", "\\u$1")).toBe("hello Ajanuw");
  });

  it("replace test \\U", () => {
    const p = new PerlRegExp(" (?:- (\\w*) ) ", "xig");
    const r = p.replace("color-red", "\\U$1");
    expect(r).toBe("colorRED");
  });
  it("replace test \\l", () => {
    const p = new PerlRegExp(" ([A-Z]) ", "xg");
    const r = p.replace("colorRed", "-\\l$1");
    expect(r).toBe("color-red");
  });
  it("replace test \\L", () => {
    const p = new PerlRegExp(" ([A-Z]*) ", "xg");
    const r = p.replace("color-RED", "\\L$1");
    expect(r).toBe("color-red");
  });
  it("replace test \\Q", () => {
    const p = new PerlRegExp("([^]*)", "xg");
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
    const p = new PerlRegExp("(-)");
    const r = p.replace("color-red", "\\U$`");
    expect(r).toBe("colorCOLORred");
  });
  it("replace test $'", () => {
    const p = new PerlRegExp("(-)");
    const r = p.replace("color-red", "\\U$'");
    expect(r).toBe("colorREDred");
  });
  it("replace test $&", () => {
    const p = new PerlRegExp("(-)");
    const r = p.replace("color-red", "$&$&");
    expect(r).toBe("color--red");
  });
});
