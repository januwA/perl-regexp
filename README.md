## PerlRegExp

perl regexp in javascript

## install
```
npm i perl-regexp
```

## Added `x` modifier, you can add spaces in regular expressions
```ts
const p = new PerlRegExp(" (?:- (\\w) ) ", "xig");

// or
// const p = new PerlRegExp(/ (?:- (\w) ) /, "xig");

const r = p.replace("color-red", "\\u$1");
expect(r).toBe("colorRed");
```

## replace
```ts
const p = new PerlRegExp(" ([A-Z]) ", "xg");
const r = p.replace("colorRed", "-\\l$1");
expect(r).toBe("color-red");

const p = new PerlRegExp("(-)");
const r = p.replace("color-red", (match, g1) => {
  expect(g1).toBe("-");
  return "_";
});
expect(r).toBe("color_red");
```


* "\u" convert the next letter to uppercase
* "\U" will convert the following characters to uppercase, until \E
* "\l" convert the next letter to lowercase
* "\L" will convert the following characters to lowercase, until \E
* "\Q" put it to the non-word characters between \E and escape with a backslash
* "\E" ends the scope of action \L, \U, \Q starts