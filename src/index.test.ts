/**
 * @file **unraw tests** | Tests for compress-tag.
 * @author Ian Sanders
 * @copyright 2019 Ian Sanders
 * @license MIT
 */

/* eslint-disable max-len, no-useless-escape, mocha/no-setup-in-describe */

import * as assert from "assert";
import unraw from "./index";

const raw = String.raw;

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
  const title = description ? `${raw} (${description})` : raw;

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

context("unraw", function(): void {
  const errors = {
    malformedUnicode: new SyntaxError(
      "malformed Unicode character escape sequence"
    ),
    malformedHexadecimal: new SyntaxError(
      "malformed hexadecimal character escape sequence"
    ),
    codePointLimit: new SyntaxError(
      "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
    ),
    octalDeprecation: new SyntaxError(
      '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
    ),
    endOfStringError: new SyntaxError(
      "malformed escape sequence at end of string"
    )
  };

  it("should ignore strings with no escape sequences", function(): void {
    assert.strictEqual(unraw("test"), "test");
  });

  it("should error on 0-length escape sequence", function(): void {
    assert.throws(function(): void {
      unraw("test\\");
    }, errors.endOfStringError);
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
    testParses("\\X00", "\X00", "capital initializer - not a hexadecimal sequence");
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
      context("\\x (zero digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x`);
          }, errors.malformedHexadecimal);
        });
      });

      context("\\x5 (one digit)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x5`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x5`);
          }, errors.malformedHexadecimal);
        });
      });

      context("\\x$$ (non-hex characters)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x$$`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\x$$test`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x$$`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x$$test`);
          }, errors.malformedHexadecimal);
        });
      });

      context("\\x-A (negative, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x-A`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\x-Atest`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x-A`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x-Atest`);
          }, errors.malformedHexadecimal);
        });
      });

      context("\\x+A (positive, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x+A`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\x+Atest`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x+A`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x+Atest`);
          }, errors.malformedHexadecimal);
        });
      });

      context("\\xA. (decimal, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\xA.`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\xA.test`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\xA.`);
          }, errors.malformedHexadecimal);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\xA.test`);
          }, errors.malformedHexadecimal);
        });
      });

      it.skip("should have the right error", function(): void {
        // Throws a syntax error in the TS compiler so it can't be compiled
        /*
        let unrawErrorText = "";
        let jsErrorText = "";
        try {
          unraw(`\\x$$`);
        } catch (e) {
          unrawErrorText = e.toString();
        }
        try {
          "\x$$";
        } catch (e) {
          jsErrorText = e.toString();
        }
        assert.strictEqual(unrawErrorText, jsErrorText);
        */
      });
    });
  });

  describe("handles Unicode escape sequences", function(): void {
    testParses("\\U0000", "\U0000", "capital initializer - not a Unicode escape sequence");
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
      context("\\u (zero digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u5 (one digit)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u5A (two digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u5A5 (three digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A5`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A5`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u$$$$ (non-hex characters)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u$$$$`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u$$$$test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u$$$$`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u$$$$test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u-5A5 (negative, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u-5A5`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u-5A5test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u-5A5`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u-5A5test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u+5A5 (positive, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u+5A5`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u+5A5test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u+5A5`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u+5A5test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u5A5. (decimal, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A5.`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A5.test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A5.`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A5.test`);
          }, errors.malformedUnicode);
        });
      });

      it.skip("should have the right error", function(): void {
        // Throws a syntax error in the TS compiler so it can't be compiled
        /*
        let unrawErrorText = "";
        let jsErrorText = "";
        try {
          unraw(raw`\u$$$$`);
        } catch (e) {
          unrawErrorText = e.toString();
        }
        try {
          "\u$$$$";
        } catch (e) {
          jsErrorText = e.toString();
        }
        assert.strictEqual(unrawErrorText, jsErrorText);
        */
      });
    });

    context("with surrogates", function(): void {
      testParses("\\uD800\\UDC00", "\uD800\UDC00", "capital initializer - not a Unicode surrogate escape sequence");
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
        context("\\uDA99\\u (zero digits)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\u`);
            }, errors.malformedUnicode);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\u`);
            }, errors.malformedUnicode);
          });
        });

        context("\\uDA99\\uD (one digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\uD`);
            }, errors.malformedUnicode);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\uD`);
            }, errors.malformedUnicode);
          });
        });

        context("\\uDA99\\uDD (two digits)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\uDD`);
            }, errors.malformedUnicode);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\uDD`);
            }, errors.malformedUnicode);
          });
        });

        context("\\uDA99\\uDD8 (three digits)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\uDD8`);
            }, errors.malformedUnicode);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\uDD8`);
            }, errors.malformedUnicode);
          });
        });

        context("\\uDA99\\u$$$$ (non-hex characters)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\u$$$$`);
            }, errors.malformedUnicode);
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\u$$$$test`);
            }, errors.malformedUnicode);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\u$$$$`);
            }, errors.malformedUnicode);
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\u$$$$test`);
            }, errors.malformedUnicode);
          });
        });

        it.skip("should have the right error", function(): void {
          // Throws a syntax error in the TS compiler so it can't be compiled
          /*
          let unrawErrorText = "";
          let jsErrorText = "";
          try {
            unraw(raw`\uDA99\u$$$$`);
          } catch (e) {
            unrawErrorText = e.toString();
          }
          try {
            "\uDA99\u$$$$";
          } catch (e) {
            jsErrorText = e.toString();
          }
          assert.strictEqual(unrawErrorText, jsErrorText);
          */
        });
      });
    });
  });

  describe("handles Unicode code point escape sequences", function(): void {
    testParses("\\U{0}", "\U{0}", "capital initializer - not a code point sequence");
    testParses("\\u{0}", "\u{0}", "minimum possible value");
    testParses("\\u{5A5A}", "\u{5A5A}", "typical value");
    testParses("\\u{FFFFF}", "\u{FFFFF}", "maximum possible value");
    testParses("\\u{fafa}", "\u{fafa}", "lowercase");
    testParses("\\u{fAFa}", "\u{fAFa}", "mixed case");
    testParses("\\u{000000000005A5A}", "\u{000000000005A5A}", "leading zeros");

    describe("handles deeper escape levels", function(): void {
      testParses("\\\\u{5A5A}", "\\u{5A5A}", "even number of escapes");
      testParses("\\\\\\u{5A5A}", "\\\u{5A5A}", "odd number of escapes");
    });

    describe("errors on invalid sequences", function(): void {
      context("\\u{} (zero digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{}`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{}test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{}`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{}test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u{FFFFFF} (too high)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{FFFFFF}`);
          }, errors.codePointLimit);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{FFFFFF}test`);
          }, errors.codePointLimit);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{FFFFFF}`);
          }, errors.codePointLimit);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{FFFFFF}test`);
          }, errors.codePointLimit);
        });
      });

      context("\\u{$$$$} (non-hex characters)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{$$$$}`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{$$$$}test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{$$$$}`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{$$$$}test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u{-1} (negative, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{-1}`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{-1}test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{-1}`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{-1}test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u{+1} (positive, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{+1}`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{+1}test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{+1}`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{+1}test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u{1.} (decimal, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{1.}`);
          }, errors.malformedUnicode);
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{1.}test`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{1.}`);
          }, errors.malformedUnicode);
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{1.}test`);
          }, errors.malformedUnicode);
        });
      });

      context("\\u{A (unclosed sequence)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{A`);
          }, errors.malformedUnicode);
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{A`);
          }, errors.malformedUnicode);
        });
      });

      it.skip("should have the right error", function(): void {
        // Throws a syntax error in the TS compiler so it can't be compiled
        /*
        let unrawErrorText = "";
        let jsErrorText = "";
        try {
          unraw(raw`\u{A`);
        } catch (e) {
          unrawErrorText = e.toString();
        }
        try {
          "\u{A";
        } catch (e) {
          jsErrorText = e.toString();
        }
        assert.strictEqual(unrawErrorText, jsErrorText);
        */
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
        context("\\1 (single digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(raw`\1`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(raw`\1test`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\1`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\1test`, false);
            }, errors.octalDeprecation);
          });
        });

        context("\\00 (double digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(raw`\00`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(raw`\00test`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\00`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\00test`, false);
            }, errors.octalDeprecation);
          });
        });

        context("\\101 (triple digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(raw`\101`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(raw`\101test`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\101`, false);
            }, errors.octalDeprecation);
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\101test`, false);
            }, errors.octalDeprecation);
          });
        });
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
