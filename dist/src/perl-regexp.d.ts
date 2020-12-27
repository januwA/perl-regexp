export interface Replacer {
    (substring: string, ...args: any[]): string;
}
export declare type ReplaceValue = string | Replacer;
export declare class PerlRegExp extends RegExp {
    /**
     *
     * @param pattern string或则RegExp
     * @param flags 如果存在则替换[pattern]的flags, 不存在则会继承[pattern]的flags, 如果有的话
     */
    constructor(pattern: string | RegExp, flags?: string);
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
    replace(str: string, replaceValue: ReplaceValue): string;
}
