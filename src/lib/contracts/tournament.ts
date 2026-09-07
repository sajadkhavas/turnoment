export type TournamentStatus = "open" | "filling" | "closed" | "upcoming";

export type TournamentFormat = "1v1" | "team" | "single-elim" | "double-elim" | "round-robin";

export type TournamentDateBucket = "today" | "tomorrow" | "weekend" | "week" | "later";

export interface TournamentSummary {
  id: string;
  slug: string;
  title: string;
  game: string;
  gameId: string;
  gamingCenterId: string;
  formatKind: TournamentFormat;
  bracket: string;
  dateBucket: TournamentDateBucket;
  venue: string;
  venueVerified: boolean;
  city: string;
  district: string;
  date: string;
  time: string;
  format: string;
  capacity: number;
  registered: number;
  entryFee: number;
  fixedPrize: number;
  status: TournamentStatus;
}

export interface TournamentQuery {
  game: string;
  city: string;
  date: string;
  status: string;
  format: string;
  price: string;
  verified: boolean;
  sort: string;
}

export interface TournamentDiscoveryStats {
  tournaments: number;
  centers: number;
  cities: number;
}

export interface TournamentDiscoveryResult {
  items: TournamentSummary[];
  stats: TournamentDiscoveryStats;
}
