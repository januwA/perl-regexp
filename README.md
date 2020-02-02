## PerlRegExp

> 在`javascript`中勉强模拟`perl`的正则表达式

## 增加了`x`修饰符，可以在正则表达式中添加空格
```ts
const p = new PerlRegExp(" (?:- (\\w) ) ", "xig");
const r = p.replace("color-red", "\\u$1");
expect(r).toBe("colorRed");
```

## 添加了`replace`方法, 可以使用`\u \U \l \L \Q \E`，具体可以看`replace`方法的注释
```ts
const p = new PerlRegExp(" ([A-Z]) ", "xg");
const r = p.replace("colorRed", "-\\l$1");
expect(r).toBe("color-red");

expect(/(ajanuw)/.replace("hello ajanuw", "\\u$1")).toBe("hello Ajanuw");


const p = new PerlRegExp("(-)");
const r = p.replace("color-red", (match, g1) => {
  expect(g1).toBe("-");
  return "_";
});
expect(r).toBe("color_red");
```