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

/*
    "verbose": true,
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    "testMatch": [
      "**.test.js"
    ],
    "testEnvironment": "node",
    "testEnvironmentOptions": {
      "browsers": [
        "chrome",
        "firefox",
        "safari"
      ]
    }
*/