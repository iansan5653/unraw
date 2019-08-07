/**
 * @file **unraw tests** | Tests for compress-tag.
 * @author Ian Sanders
 * @copyright 2019 Ian Sanders
 * @license MIT
 */

/* eslint-disable max-len, no-useless-escape, mocha/no-setup-in-describe */

import * as assert from "assert";
import unraw from "./index";

type ErrorMessageName =
  | "malformedUnicode"
  | "malformedHexadecimal"
  | "codePointLimit"
  | "octalDeprecation"
  | "endOfString";

const errorMessages = new Map<ErrorMessageName, string>([
  ["malformedUnicode", "malformed Unicode character escape sequence"],
  ["malformedHexadecimal", "malformed hexadecimal character escape sequence"],
  [
    "codePointLimit",
    "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
  ],
  [
    "octalDeprecation",
    '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
  ],
  ["endOfString", "malformed escape sequence at end of string"]
]);

const formatTestTitle = function(ch: string, desc?: string): string {
  return desc ? `${ch} (${desc})` : ch;
};

/**
 * Tests that the `unraw` output is exactly the same as the normal JavaScript
 * output, alone and with text before, after, and around.
 * @param raw The raw string to pass to unraw (ie, `"\\n"`).
 * @param cooked The 'cooked' version of the raw string (ie, `"\n"`).
 * @param description A short description of what is being tested (ie,
 * `"newline"`).
 * @param allowOctals Control whether octal sequences throw errors in `unraw`.
 * @param only Run only this test set. Same effect as calling `context.only`
 * instead of `context`.
 */
function testParses(
  raw: string,
  cooked: string,
  description?: string,
  allowOctals?: boolean,
  only: boolean = false
): void {
  const title = formatTestTitle(raw, description);

  function runTests(): void {
    it("should parse alone", function(): void {
      assert.strictEqual(unraw(`${raw}`, allowOctals), `${cooked}`);
    });
    it("should parse with text before", function(): void {
      assert.strictEqual(unraw(`test${raw}`, allowOctals), `test${cooked}`);
    });
    it("should parse with text after", function(): void {
      assert.strictEqual(unraw(`${raw}test`, allowOctals), `${cooked}test`);
    });
    it("should parse with text around", function(): void {
      assert.strictEqual(
        unraw(`test${raw}test`, allowOctals),
        `test${cooked}test`
      );
    });
  }

  if (only) {
    // eslint-disable-next-line mocha/no-exclusive-tests
    context.only(title, runTests);
  } else {
    // eslint-disable-next-line mocha/max-top-level-suites
    context(title, runTests);
  }
}

/**
 * Tests that the given sequence throws a `SyntaxError` with the given message
 * when passed through `unraw`.
 * @param raw The raw string to pass to unraw (ie, `"\\n"`).
 * @param errorName The name of the error message defined in `errorMessages` to
 * test against.
 * @param description A short description of what is being tested (ie,
 * `"newline"`).
 * @param isEndOfString If `true`, will not run the 'after' and 'around' tests.
 * Used for testing sequences that are shorter than they should be.
 * @param allowOctals Control whether octal sequences throw errors in `unraw`.
 * @param only Run only this test set. Same effect as calling `context.only`
 * instead of `context`.
 */
function testErrors(
  raw: string,
  errorName: ErrorMessageName,
  description?: string,
  isEndOfString: boolean = false,
  allowOctals?: boolean,
  only: boolean = false
): void {
  const title = formatTestTitle(raw, description);
  const error = new SyntaxError(errorMessages.get(errorName));

  function runTests(): void {
    it("should error alone", function(): void {
      assert.throws(function(): void {
        unraw(`${raw}`, allowOctals);
      }, error);
    });
    it("should error with text before", function(): void {
      assert.throws(function(): void {
        unraw(`test${raw}`, allowOctals);
      }, error);
    });

    if (!isEndOfString) {
      it("should error with text after", function(): void {
        assert.throws(function(): void {
          unraw(`${raw}test`, allowOctals);
        }, error);
      });
      it("should error with text around", function(): void {
        assert.throws(function(): void {
          unraw(`test${raw}test`, allowOctals);
        }, error);
      });
    }
  }

  if (only) {
    // eslint-disable-next-line mocha/no-exclusive-tests
    context.only(title, runTests);
  } else {
    // eslint-disable-next-line mocha/max-top-level-suites
    context(title, runTests);
  }
}

context("unraw", function(): void {
  it("should not affect strings with no escape sequences", function(): void {
    assert.strictEqual(unraw("test"), "test");
  });

  it("should error on 0-length escape sequence", function(): void {
    assert.throws(function(): void {
      unraw("test\\");
    }, new SyntaxError(errorMessages.get("endOfString")));
  });

  describe("handles single character escape sequences", function(): void {
    testParses("\\\\", "\\", "backslash");
    testParses("\\b", "\b", "backspace character");
    testParses("\\f", "\f", "form feed");
    testParses("\\n", "\n", "newline");
    testParses("\\r", "\r", "carriage return");
    testParses("\\t", "\t", "tab");
    testParses("\\v", "\v", "vertical tab");
    testParses("\\0", "\0", "null character");
    testParses("\\'", "'", "single quote");
    testParses('\\"', '"', "double quote");
    testParses("\\`", "`", "backtick");
    testParses("\\$", "$", "dollar sign");
    testParses("\\a", "a", "lowercase a");
    testParses("\\T", "T", "uppercase T");
    testParses("\\X", "X", "uppercase X");
    testParses("\\U", "U", "uppercase U");

    describe("handles deeper escape levels", function(): void {
      testParses("\\\\t", "\\t", "even number of escapes");
      testParses("\\\\\\t", "\\\t", "odd number of escapes");
    });
  });

  describe("handles hexadecimal escape sequences", function(): void {
    testParses(
      "\\X00",
      "X00",
      "capital initializer - not a hexadecimal sequence"
    );
    testParses("\\x00", "\x00", "minimum possible value");
    testParses("\\x5A", "\x5A", "typical value");
    testParses("\\xFF", "\xFF", "maximum possible value");
    testParses("\\xfa", "\xfa", "lowercase");
    testParses("\\xFa", "\xFa", "mixed case");

    describe("handles deeper escape levels", function(): void {
      testParses("\\\\x5A", "\\x5A", "even number of escapes");
      testParses("\\\\\\x5A", "\\\x5A", "odd number of escapes");
    });

    describe("errors on invalid sequences", function(): void {
      testErrors("\\x", "malformedHexadecimal", "zero digits", true);
      testErrors("\\x5", "malformedHexadecimal", "one digit", true);
      testErrors("\\x$$", "malformedHexadecimal", "non-hex characters");
      testErrors("\\x-A", "malformedHexadecimal", "negative, non-hex");
      testErrors("\\x+A", "malformedHexadecimal", "positive, non-hex");
      testErrors("\\xA.", "malformedHexadecimal", "decimal, non-hex");

      it.skip("should have the right error", function(): void {
        // Compare the thrown error to the actual syntax error
        // Trying to find a way to do this without the TypeScript compiler
        // failing on compile
      });
    });
  });

  describe("handles Unicode escape sequences", function(): void {
    testParses(
      "\\U0000",
      "U0000",
      "capital initializer - not a Unicode escape sequence"
    );
    testParses("\\u0000", "\u0000", "minimum possible value");
    testParses("\\u5A5A", "\u5A5A", "typical value");
    testParses("\\uFFFF", "\uFFFF", "maximum possible value");
    testParses("\\ufafa", "\ufafa", "lowercase");
    testParses("\\ufAFa", "\ufAFa", "mixed case");

    describe("handles deeper escape levels", function(): void {
      testParses("\\\\u5A5A", "\\u5A5A", "even number of escapes");
      testParses("\\\\\\u5A5A", "\\\u5A5A", "odd number of escapes");
    });

    describe("errors on invalid sequences", function(): void {
      testErrors("\\u", "malformedUnicode", "zero digits", true);
      testErrors("\\u5", "malformedUnicode", "one digit", true);
      testErrors("\\u5A", "malformedUnicode", "two digits", true);
      testErrors("\\u5A5", "malformedUnicode", "three digits", true);
      testErrors("\\u$$$$", "malformedUnicode", "non-hex characters");
      testErrors("\\u-5A5", "malformedUnicode", "negative, non-hex");
      testErrors("\\u+5A5", "malformedUnicode", "positive, non-hex");
      testErrors("\\u5A5.", "malformedUnicode", "decimal, non-hex");

      it.skip("should have the right error", function(): void {
        // Compare the thrown error to the actual syntax error
        // Trying to find a way to do this without the TypeScript compiler
        // failing on compile
      });
    });

    context("with surrogates", function(): void {
      testParses(
        "\\uD800\\UDC00",
        "\uD800UDC00",
        "capital initializer - not a Unicode surrogate escape sequence"
      );
      testParses("\\uD800\\uDC00", "\uD800\uDC00", "minimum possible value");
      testParses("\\uDA99\\uDD80", "\uDA99\uDD80", "typical value");
      testParses("\\uDBFF\\uDFFF", "\uDBFF\uDFFF", "maximum possible value");
      testParses("\\uDA99\\udd80", "\uDA99\udd80", "lowercase");
      testParses("\\uDA99\\uDd80", "\uDA99\uDd80", "mixed case");

      describe("handles deeper escape levels", function(): void {
        testParses(
          "\\\\uDA99\\uDD80",
          "\\uDA99\uDD80",
          "even number of escapes"
        );
        testParses(
          "\\\\\\uDA99\\uDD80",
          "\\\uDA99\uDD80",
          "odd number of escapes"
        );
      });

      describe("errors on invalid sequences", function(): void {
        testErrors("\\uDA99\\u", "malformedUnicode", "zero digits", true);
        testErrors("\\uDA99\\uD", "malformedUnicode", "one digit", true);
        testErrors("\\uDA99\\uDD", "malformedUnicode", "two digits", true);
        testErrors("\\uDA99\\uDD8", "malformedUnicode", "three digits", true);
        testErrors("\\uDA99\\u$$$$", "malformedUnicode", "non-hex characters");
        testErrors("\\uDA99\\u-5A5", "malformedUnicode", "negative, non-hex");
        testErrors("\\uDA99\\u+5A5", "malformedUnicode", "positive, non-hex");
        testErrors("\\uDA99\\u5A5.", "malformedUnicode", "decimal, non-hex");

        it.skip("should have the right error", function(): void {
          // Compare the thrown error to the actual syntax error
          // Trying to find a way to do this without the TypeScript compiler
          // failing on compile
        });
      });
    });
  });

  describe("handles Unicode code point escape sequences", function(): void {
    testParses(
      "\\U{0}",
      "U{0}",
      "capital initializer - not a code point sequence"
    );
    testParses("\\u{0}", "\u{0}", "minimum possible value");
    testParses("\\u{5A5A}", "\u{5A5A}", "typical value");
    testParses("\\u{FFFFF}", "\u{FFFFF}", "maximum possible value");
    testParses("\\u{fafa}", "\u{fafa}", "lowercase");
    testParses("\\u{fAFa}", "\u{fAFa}", "mixed case");
    testParses("\\u{000000000005A5A}", "\u{000000000005A5A}", "leading zeros");
    // OK, technically it is a surrogate because putting the two characters next
    // to each other in a cooked string results in a single character. But it
    // doesn't really matter as long as the result matched the JS parser result.
    testParses(
      "\\uDA99\\u{DD80}",
      "\uDA99\u{DD80}",
      "after unicode escape - should not be considered surrogate"
    );

    describe("handles deeper escape levels", function(): void {
      testParses("\\\\u{5A5A}", "\\u{5A5A}", "even number of escapes");
      testParses("\\\\\\u{5A5A}", "\\\u{5A5A}", "odd number of escapes");
    });

    describe("errors on invalid sequences", function(): void {
      testErrors("\\u{}", "malformedUnicode", "zero digits");
      testErrors("\\u{FFFFFF}", "codePointLimit", "too high");
      testErrors(
        "\\uDA99\\u{FFFFFF}",
        "codePointLimit",
        "too high - should not be considered surrogate"
      );
      testErrors("\\u{$$$$}", "malformedUnicode", "non-hex characters");
      testErrors("\\u{-1}", "malformedUnicode", "negative, non-hex");
      testErrors("\\u{+1}", "malformedUnicode", "positive, non-hex");
      testErrors("\\u{1.}", "malformedUnicode", "decimal, non-hex");
      testErrors("\\u{1", "malformedUnicode", "unclosed sequence", true);

      it.skip("should have the right error", function(): void {
        // Compare the thrown error to the actual syntax error
        // Trying to find a way to do this without the TypeScript compiler
        // failing on compile
      });
    });
  });

  describe("handles octal escape sequences", function(): void {
    context("with octals disallowed", function(): void {
      testParses("\\0", "\0", "not an octal sequence");
      testParses("\\800", "800", "not an octal sequence");
      testParses("\\+1", "+1", "not an octal sequence");
      testParses("\\-1", "-1", "not an octal sequence");

      describe("errors on octal sequences", function(): void {
        testErrors("\\1", "octalDeprecation", "one digit", true);
        testErrors("\\00", "octalDeprecation", "two digits", true);
        testErrors("\\101", "octalDeprecation", "three digits", true);
      });
    });

    context("with octals allowed", function(): void {
      // NOTE: Due to disallowing octals in strict mode, octal sequences are
      // changed for matching unicode sequences in 'expected' side

      testParses("\\0", "\0", "not an octal sequence", true);
      testParses("\\+1", "+1", "not an octal sequence", true);
      testParses("\\1", "\u0001", "single digit", true);
      testParses("\\11", "\u0009", "two digits", true);
      testParses("\\101", "\u0041", "three digits", true);
      testParses("\\00", "\u0000", "minimum value", true);
      testParses("\\377", "\u00FF", "maximum value", true);
      testParses("\\400", "\u00200", "higher than maximum value", true);
      testParses("\\119", "\u00099", "non-octal digit", true);
    });
  });
});
