import {describe, expect, test} from '@jest/globals';
import {formatTime} from "../../model/formatTime";

describe('return formated time', () => {
    test('125to 2h 05m', () => {
        expect(formatTime(125)).toBe("2h 05m");
    });
    test('45to 0h 45m', () => {
        expect(formatTime(45)).toBe("0h 45m");
    });
    test('203to 3h 23m', () => {
        expect(formatTime(203)).toBe("3h 23m");
    });
});