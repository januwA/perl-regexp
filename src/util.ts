import { all_space, start_slash, end_slash } from "./exp";

export function hasX(flags?: string): boolean {
  return !!flags && flags.includes("x");
}

/**
 * /a/ig => regexp2String => a
 * @param pattern
 */
export function regexp2String(pattern: RegExp) {
  return pattern
    .toString()
    .replace(all_space, "")
    .replace(start_slash, "")
    .replace(end_slash, "");
}
