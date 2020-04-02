export const u_replace = /(?:\\u([a-z]))/g;
export const U_replace = /(?:\\U([a-z]+)(\\E)?)/g;
export const l_replace = /(?:\\l([A-Z]))/g;
export const L_replace = /(?:\\L([A-Z]+)(\\E)?)/g;
export const Q_replace = /(?:\\Q([^\\E]*(?:\\E)?))/g;
export const all_space = /\s/g;
export const start_slash = /^\//;
export const end_slash = /\/([a-z]*)$/;