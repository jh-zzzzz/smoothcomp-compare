import { describe, expect, it } from "vitest";
import { getOpps, getOppsInCommon } from "../src/util";
import { competitorWithNoMatches, mockCompetitorsInfo, noOppsInCommon } from "./mocks";

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
});

describe("getOppsInCommon()", () => {

    it("gets opps in common", () => {
        const actual = getOppsInCommon(mockCompetitorsInfo);
        const expected = new Map([
            [1, [10, 20]],
            [2, [10, 20, 30]]
        ]);
        expect(actual).toEqual(expected);
    }),

    it("handles competitors with no opps in common", () => {
        const actual = getOppsInCommon(noOppsInCommon);
        const expected = new Map<number, number[]>();
        expect(actual).toEqual(expected);
    }),

    it("handles competitor with no matches/opps", () => {
        const actual = getOppsInCommon(mockCompetitorsInfo.concat(competitorWithNoMatches));

        expect(Array.from(actual.values())
            .every(val => {
                return !val.includes(competitorWithNoMatches.id)

                    // contains at least two of the competitors
                    && ([...mockCompetitorsInfo.filter(c => val.includes(c.id))].length >= 2)
            })
        ).toBeTruthy();
    })
});
