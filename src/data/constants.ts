export const CONSOLES = {
  "nintendo-switch": "switch",
  ps5: "playstation 5",
  "xbox-series-x": "xbox series x",
  pc: "pc",
} as const;

export type Consoles = keyof typeof CONSOLES;

export const TYPES = {
  new: "recent releases",
  coming_soon: "coming soon",
} as const;

export type Types = keyof typeof TYPES;
