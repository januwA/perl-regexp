const u_replace = /(?:\\u([a-z]))/g;
const U_replace = /(?:\\U([a-z]+)(\\E)?)/g;
const l_replace = /(?:\\l([A-Z]))/g;
const L_replace = /(?:\\L([A-Z]+)(\\E)?)/g;
const Q_replace = /(?:\\Q([^\\E]*(?:\\E)?))/g;
const all_space = /\s/g;
const start_slash = /^\//;
const end_slash = /\/$/;

function hasX(flags?: string): boolean {
  return !!flags && flags.includes("x");
}

function handlePattern(pattern: string | RegExp, flags?: string) {
  // 不包含x修饰符，直接返回
  if (!hasX(flags)) return pattern;

  if (typeof pattern === "string") {
    // 如果是string，斩掉所有空格返回
    return pattern.replace(all_space, "");
  } else {
    // 如果是Regexp, 转化为字符串后，斩掉空格和首位的 /
    return pattern
      .toString()
      .replace(all_space, "")
      .replace(start_slash, "")
      .replace(end_slash, "");
  }
}

function handleFlags(flags?: string) {
  return hasX(flags) ? flags!.replace(/x/g, "") : flags;
}

function g1UpperCase(_: string, g1: string) {
  return g1.toUpperCase();
}

function g1LowerCase(_: string, g1: string) {
  return g1.toLowerCase();
}

export interface Replacer {
  (substring: string, ...args: any[]): string;
}

export type ReplaceValue = string | Replacer;

declare global {
  interface RegExp {
    replace(str: string, replaceValue: ReplaceValue): string;
  }
}

/**
 *
 * \u 将下一个字母转换为大写
 *
 * \U 将后面的字符都转换为大写，直到\E为止
 *
 * \l 将下一个字母转换为小写
 *
 * \L 将后面的字符都转换为小写，直到\E为止
 *
 * \Q 把它到\E之间的非单词字符，加上反斜线转义
 *
 * \E 结束\L, \U, \Q开始的作用范围
 *
 * ```ts
 * const p = new PerlRegExp(" (?:- (\\w) ) ", "xig");
 * const m = p.replace("color-red", "\\u$1");
 * console.log(m); // colorRed
 * ```
 */
RegExp.prototype.replace = function(str: string, replaceValue: ReplaceValue) {
  if (replaceValue instanceof Function) {
    return str.replace(this, replaceValue);
  }

  return str.replace(this, function(match: string) {
    if (!match) return "";
    const args = Array.from(arguments).slice(1); // 所有的打组
    const str = args.splice(args.length - 1, 1); // 获取元字符
    const index = args.splice(args.length - 1, 1); // 获取 index

    let newReplaceValue = replaceValue;

    newReplaceValue = newReplaceValue.replace(/\$\+/g, (RegExp as any)["$+"]); // 匹配到的最后一个子串（如果存在）
    newReplaceValue = newReplaceValue.replace(/\$_/g, (RegExp as any)["$_"]); // 正则表达式所匹配的字符串
    newReplaceValue = newReplaceValue.replace(/\$\&/g, (RegExp as any)["$&"]); // 最后匹配到的字符串
    newReplaceValue = newReplaceValue.replace(/\$`/g, (RegExp as any)["$`"]); // 匹配部分的前一部分字符串
    newReplaceValue = newReplaceValue.replace(/\$'/g, (RegExp as any)["$'"]); // 还没有匹配的剩余字符串

    // 将打组，分配到各个$1-9
    args
      .map(i => (i === undefined ? "" : i))
      .forEach((item, index) => {
        newReplaceValue = newReplaceValue.replace(
          new RegExp(`\\$${index + 1}`, "g"),
          item
        );
      });

    newReplaceValue = newReplaceValue.replace(u_replace, g1UpperCase);
    newReplaceValue = newReplaceValue.replace(U_replace, g1UpperCase);

    newReplaceValue = newReplaceValue.replace(l_replace, g1LowerCase);
    newReplaceValue = newReplaceValue.replace(L_replace, g1LowerCase);

    newReplaceValue = newReplaceValue.replace(Q_replace, (_, g1: string) =>
      g1.replace(/\\E/, "").replace(/(\W)/g, "\\$1")
    );

    return newReplaceValue;
  });
};

export class PerlRegExp extends RegExp {
  constructor(pattern: string | RegExp, flags?: string) {
    super(handlePattern(pattern, flags), handleFlags(flags));
  }

  replace(str: string, replaceValue: ReplaceValue): string {
    return super.replace(str, replaceValue);
  }
}
