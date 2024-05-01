export type CompetitorInfo = {
    id: number;
    name: string;
    matches: Match[];
  };

  export type Match = {
    timestamp: number;
    opponent: {name: string; id: number};
    isWinner: boolean
  }