import { describe, expect, it } from "vitest";
import { getOpps, getOppsInCommon } from "../src/util";
import { competitorWithNoMatches, mockCompetitorsInfo, noOppsInCommon } from "./mocks";

describe("getOpps()", () => {

    it("gets opps", () => {
        const actual = getOpps(mockCompetitorsInfo[0]);
        const expected = [{name: "Adam", id: 1}, {name: "Bertil", id: 2}, {name: "Cesar", id: 3}];
        expect(actual).toEqual(expected);
    }),

    it("gets opps despite duplicate", () => {
        const actual = getOpps(mockCompetitorsInfo[2]);
        const expected = [{name: "Bertil", id: 2}, {name: "Vasa", id: 1523}]
        expect(actual).toHaveLength(2);
        expect(actual).toEqual(expected);
    })
});

describe("getOppsInCommon()", () => {

    it("gets opps in common", () => {
        const actual = getOppsInCommon(mockCompetitorsInfo);
        const expected = new Map([
            [{id: 1, name: "Adam"}, [10, 20]],
            [{id: 2, name: "Bertil"}, [10, 20, 30]]
        ]);
        expect(actual).toEqual(expected);
    }),

    it("handles competitors with no opps in common", () => {
        const actual = getOppsInCommon(noOppsInCommon);
        const expected = new Map<{name: string, id: number}, number[]>();
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
