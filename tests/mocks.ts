import { CompetitorInfo } from "../src/types"

export const mockCompetitorsInfo: CompetitorInfo[] = [
    {
        id: 10,
        name: "",
        matches: [
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "Adam", id: 1 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "Bertil", id: 2 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "Cesar", id: 3 }
            },
        ]
    },
    {
        id: 20,
        name: "",
        matches: [
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 1 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 2 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 1337 }
            },
        ]
    },
    {
        id: 30,
        name: "",
        matches: [
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "Bertil", id: 2 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "Bertil", id: 2 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "Vasa", id: 1523 }
            },
        ]
    }
];

export const noOppsInCommon: CompetitorInfo[] = [
    {
        id: 100,
        name: "",
        matches: [
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 1 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 2 }
            }
        ]
    },
    {
        id: 200,
        name: "",
        matches: [
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 3 }
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: { name: "", id: 4 }
            }
        ]
    }
];

export const competitorWithNoMatches: CompetitorInfo = {
    id: 11,
    name: "",
    matches: []
};
