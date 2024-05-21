import { describe, expect, it, test } from "vitest";
import { CompetitorInfo } from "../src/types";
import { getOpps } from "../src/util";

const mockCompetitorsInfo: CompetitorInfo[] = [
    {
        id: 10,
        name: "",
        matches: [
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 1}
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 2}
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 3}
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
                opponent: {name: "", id: 1}
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 2}
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 1337}
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
                opponent: {name: "", id: 2}
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 2}
            },
            {
                isWinner: false,
                timestamp: 0,
                opponent: {name: "", id: 1523}
            },
        ]
    }
]

describe("getOpps()", () => {
    it("gets opps", () => {
        const actual = getOpps(mockCompetitorsInfo[0]);
        const expected = [1, 2, 3];
        expect(actual).toEqual(expected);
    }),
    it("gets opps despite duplicate", () => {
        const actual = getOpps(mockCompetitorsInfo[2]);
        const expected = [2, 1523]
        expect(actual).toHaveLength(2);
        expect(actual).toEqual(expected);
    })
})
// test("true is true", () => {
//     const truuu: boolean = true;
//     expect(truuu).toBe(true);
// });