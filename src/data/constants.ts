export const CONSOLES = {
  "nintendo-switch": "switch",
  ps5: "playstation 5",
  "xbox-series-x": "xbox series x",
  pc: "pc",
} as const;

export const CONSOLE_ID = {
  [CONSOLES["nintendo-switch"]]: 130,
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
