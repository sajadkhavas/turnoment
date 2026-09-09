const GAME_SLUG_BY_ID: Record<string, string> = {
  eafc26: "ea-fc-26",
  efootball: "efootball",
  tekken8: "tekken-8",
  mk: "mortal-kombat",
  cs2: "counter-strike-2",
  warcraft: "warcraft",
};

export function publicGameSlug(gameId: string) {
  return GAME_SLUG_BY_ID[gameId] ?? gameId;
}
