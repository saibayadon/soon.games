export const CONSOLES = {
  "nintendo-switch-2": "switch 2",
  ps5: "playstation 5",
  "xbox-series-x": "xbox series x",
  pc: "pc",
} as const;

export const CONSOLE_ID = {
  [CONSOLES["nintendo-switch-2"]]: 508,
  [CONSOLES.ps5]: 167,
  [CONSOLES["xbox-series-x"]]: 169,
  [CONSOLES.pc]: 6,
};

export type Consoles = keyof typeof CONSOLES;

export const TYPES = {
  new: "recent releases",
  coming_soon: "coming soon",
} as const;

export type Types = keyof typeof TYPES;

// `Object.hasOwn` rather than `in`, so inherited keys like "constructor" or
// "toString" are not mistaken for real consoles/types.
export const isConsole = (value: string): value is Consoles =>
  Object.hasOwn(CONSOLES, value);

export const isType = (value: string): value is Types =>
  Object.hasOwn(TYPES, value);
