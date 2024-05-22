import { describe, expect, it, test } from "vitest";
import { getOpps, getOppsInCommon } from "../src/util";
import { mockCompetitorsInfo, noOppsInCommon } from "./mocks";

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
    })
});
