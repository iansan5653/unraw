/**
 * @file **unraw tests** | Tests for compress-tag.
 * @author Ian Sanders
 * @copyright 2019 Ian Sanders
 * @license MIT
 */

/* eslint-disable max-len */
/* eslint-disable no-useless-escape */

import * as assert from "assert";
import unraw from "./index";

const raw = String.raw;

context("unraw", function(): void {
  it("should ignore strings with no escape sequences", function(): void {
    assert.strictEqual(unraw("test"), "test");
  });

  it("should error on 0-length escape sequence", function(): void {
    assert.throws(function(): void {
      unraw("test\\");
    }, new SyntaxError("malformed escape sequence at end of string"));
  });

  describe("handles single character escape sequences", function(): void {
    context("\\b (backspace)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\b`), `\b`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\btest`), `\btest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\b`), `test\b`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\btest`), `test\btest`);
      });
    });

    context("\\f (form feed)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\f`), `\f`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\ftest`), `\ftest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\f`), `test\f`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\ftest`), `test\ftest`);
      });
    });

    context("\\n (newline)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\n`), `\n`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\ntest`), `\ntest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\n`), `test\n`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\ntest`), `test\ntest`);
      });
    });

    context("\\r (carriage return)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\r`), `\r`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\rtest`), `\rtest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\r`), `test\r`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\rtest`), `test\rtest`);
      });
    });

    context("\\t (tab)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\t`), `\t`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\ttest`), `\ttest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\t`), `test\t`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\ttest`), `test\ttest`);
      });
    });

    context("\\v (vertical tab)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\v`), `\v`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\vtest`), `\vtest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\v`), `test\v`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\vtest`), `test\vtest`);
      });
    });

    context("\\0 (null)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\0`), `\0`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\0test`), `\0test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\0`), `test\0`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\0test`), `test\0test`);
      });
    });

    context("\\' (single quote)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\'`), `\'`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\'test`), `\'test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\'`), `test\'`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\'test`), `test\'test`);
      });
    });

    context('\\" (double quote)', function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\"`), `\"`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\"test`), `\"test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\"`), `test\"`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\"test`), `test\"test`);
      });
    });

    context("\\\\ (backslash)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\\`), `\\`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\\test`), `\\test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\\`), `test\\`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\\test`), `test\\test`);
      });
    });

    context("\\` (backtick)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\``), `\``);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\`test`), `\`test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\``), `test\``);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\`test`), `test\`test`);
      });
    });

    context("\\$ (dollar sign)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\$`), `\$`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\$test`), `\$test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\$`), `test\$`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\$test`), `test\$test`);
      });
    });

    context("\\A (unnecessary escape)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\A`), `\A`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\Atest`), `\Atest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\A`), `test\A`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\Atest`), `test\Atest`);
      });
    });

    describe("handles deeper escape levels", function(): void {
      context("\\\\t (even number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\t`), `\\t`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\ttest`), `\\ttest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\t`), `test\\t`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\\ttest`), `test\\ttest`);
        });
      });

      context("\\\\\\t (odd number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\\t`), `\\\t`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\\ttest`), `\\\ttest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\\t`), `test\\\t`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\\\ttest`), `test\\\ttest`);
        });
      });
    });
  });

  describe("handles hexadecimal escape sequences", function(): void {
    context("\\x00 (minimum possible value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\x00`), `\x00`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\x00test`), `\x00test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\x00`), `test\x00`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\x00test`), `test\x00test`);
      });
    });

    context("\\x5A (typical value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\x5A`), `\x5A`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\x5Atest`), `\x5Atest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\x5A`), `test\x5A`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\x5Atest`), `test\x5Atest`);
      });
    });

    context("\\xFF (maximum possible value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\xFF`), `\xFF`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\xFFtest`), `\xFFtest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\xFF`), `test\xFF`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\xFFtest`), `test\xFFtest`);
      });
    });

    context("\\xfa (lowercase)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\xfa`), `\xfa`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\xfatest`), `\xfatest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\xfa`), `test\xfa`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\xfatest`), `test\xfatest`);
      });
    });

    describe("handles deeper escape levels", function(): void {
      context("\\\\x5A (even number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\x5A`), `\\x5A`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\x5Atest`), `\\x5Atest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\x5A`), `test\\x5A`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\\x5Atest`), `test\\x5Atest`);
        });
      });

      context("\\\\\\x5A (odd number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\\x5A`), `\\\x5A`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\\x5Atest`), `\\\x5Atest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\\x5A`), `test\\\x5A`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\\\x5Atest`), `test\\\x5Atest`);
        });
      });
    });

    describe("errors on invalid sequences", function(): void {
      context("\\x (zero digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
      });

      context("\\x5 (one digit)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x5`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x5`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
      });

      context("\\x$$ (non-hex characters)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x$$`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\x$$test`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x$$`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x$$test`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
      });

      context("\\x-A (negative, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x-A`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\x-Atest`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x-A`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x-Atest`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
      });

      context("\\x+A (positive, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\x+A`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\x+Atest`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x+A`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\x+Atest`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
      });

      context("\\xA. (decimal, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\xA.`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\xA.test`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\xA.`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\xA.test`);
          }, new SyntaxError(
            "malformed hexadecimal character escape sequence"
          ));
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
    context("\\u0000 (minimum possible value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\u0000`), `\u0000`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\u0000test`), `\u0000test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\u0000`), `test\u0000`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\u0000test`), `test\u0000test`);
      });
    });

    context("\\u5A5A (typical value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\u5A5A`), `\u5A5A`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\u5A5Atest`), `\u5A5Atest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\u5A5A`), `test\u5A5A`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\u5A5Atest`), `test\u5A5Atest`);
      });
    });

    context("\\uFFFF (maximum possible value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\uFFFF`), `\uFFFF`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\uFFFFtest`), `\uFFFFtest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\uFFFF`), `test\uFFFF`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\uFFFFtest`), `test\uFFFFtest`);
      });
    });

    context("\\ufafa (lowercase)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\ufafa`), `\ufafa`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\ufafatest`), `\ufafatest`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\ufafa`), `test\ufafa`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\ufafatest`), `test\ufafatest`);
      });
    });

    describe("handles deeper escape levels", function(): void {
      context("\\\\u5A5A (even number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\u5A5A`), `\\u5A5A`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\u5A5Atest`), `\\u5A5Atest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\u5A5A`), `test\\u5A5A`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\\u5A5Atest`), `test\\u5A5Atest`);
        });
      });

      context("\\\\\\u5A5A (odd number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\\u5A5A`), `\\\u5A5A`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\\u5A5Atest`), `\\\u5A5Atest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\\u5A5A`), `test\\\u5A5A`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\\\u5A5Atest`), `test\\\u5A5Atest`);
        });
      });
    });

    describe("errors on invalid sequences", function(): void {
      context("\\u (zero digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u5 (one digit)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u5A (two digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u5A5 (three digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u$$$$ (non-hex characters)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u$$$$`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u$$$$test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u$$$$`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u$$$$test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u-5A5 (negative, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u-5A5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u-5A5test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u-5A5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u-5A5test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u+5A5 (positive, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u+5A5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u+5A5test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u+5A5`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u+5A5test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u5A5. (decimal, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A5.`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u5A5.test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A5.`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u5A5.test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
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
      context("\\uD800\\uDC00 (minimum possible value)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\uD800\uDC00`), `\uD800\uDC00`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\uD800\uDC00test`), `\uD800\uDC00test`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\uD800\uDC00`), `test\uD800\uDC00`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(
            unraw(raw`test\uD800\uDC00test`),
            `test\uD800\uDC00test`
          );
        });
      });

      context("\\uDA99\\uDD80 (typical value)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\uDA99\uDD80`), `\uDA99\uDD80`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\uDA99\uDD80test`), `\uDA99\uDD80test`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\uDA99\uDD80`), `test\uDA99\uDD80`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(
            unraw(raw`test\uDA99\uDD80test`),
            `test\uDA99\uDD80test`
          );
        });
      });

      context("\\uDBFF\\uDFFF (maximum possible value)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\uDBFF\uDFFF`), `\uDBFF\uDFFF`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\uDBFF\uDFFFtest`), `\uDBFF\uDFFFtest`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\uDBFF\uDFFF`), `test\uDBFF\uDFFF`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(
            unraw(raw`test\uDBFF\uDFFFtest`),
            `test\uDBFF\uDFFFtest`
          );
        });
      });

      describe("handles deeper escape levels", function(): void {
        context("\\\\uDA99\\uDD80 (even number of escapes)", function(): void {
          it("should parse alone", function(): void {
            assert.strictEqual(unraw(raw`\\uDA99\uDD80`), `\\uDA99\uDD80`);
          });
          it("should parse with text after", function(): void {
            assert.strictEqual(
              unraw(raw`\\uDA99\uDD80test`),
              `\\uDA99\uDD80test`
            );
          });
          it("should parse with text before", function(): void {
            assert.strictEqual(
              unraw(raw`test\\uDA99\uDD80`),
              `test\\uDA99\uDD80`
            );
          });
          it("should parse with text around", function(): void {
            assert.strictEqual(
              unraw(raw`test\\uDA99\uDD80test`),
              `test\\uDA99\uDD80test`
            );
          });
        });

        context("\\\\\\uDA99\\uDD80 (odd number of escapes)", function(): void {
          it("should parse alone", function(): void {
            assert.strictEqual(unraw(raw`\\\uDA99\uDD80`), `\\\uDA99\uDD80`);
          });
          it("should parse with text after", function(): void {
            assert.strictEqual(
              unraw(raw`\\\uDA99\uDD80test`),
              `\\\uDA99\uDD80test`
            );
          });
          it("should parse with text before", function(): void {
            assert.strictEqual(
              unraw(raw`test\\\uDA99\uDD80`),
              `test\\\uDA99\uDD80`
            );
          });
          it("should parse with text around", function(): void {
            assert.strictEqual(
              unraw(raw`test\\\uDA99\uDD80test`),
              `test\\\uDA99\uDD80test`
            );
          });
        });
      });

      describe("errors on invalid sequences", function(): void {
        context("\\uDA99\\u (zero digits)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\u`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\u`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
        });

        context("\\uDA99\\uD (one digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\uD`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\uD`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
        });

        context("\\uDA99\\uDD (two digits)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\uDD`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\uDD`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
        });

        context("\\uDA99\\uDD8 (three digits)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\uDD8`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\uDD8`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
        });

        context("\\uDA99\\u$$$$ (non-hex characters)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\u$$$$`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(`\\uDA99\\u$$$$test`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\u$$$$`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(`test\\uDA99\\u$$$$test`);
            }, new SyntaxError("malformed Unicode character escape sequence"));
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
    context("\\u{0} (minimum possible value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\u{0}`), `\u{0}`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\u{0}test`), `\u{0}test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\u{0}`), `test\u{0}`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\u{0}test`), `test\u{0}test`);
      });
    });

    context("\\u{5A5A} (typical value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\u{5A5A}`), `\u{5A5A}`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\u{5A5A}test`), `\u{5A5A}test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\u{5A5A}`), `test\u{5A5A}`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\u{5A5A}test`), `test\u{5A5A}test`);
      });
    });

    context("\\u{FFFFF} (maximum possible value)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\u{FFFFF}`), `\u{FFFFF}`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\u{FFFFF}test`), `\u{FFFFF}test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\u{FFFFF}`), `test\u{FFFFF}`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\u{FFFFF}test`), `test\u{FFFFF}test`);
      });
    });

    context("\\u{fafa} (lowercase)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(unraw(raw`\u{fafa}`), `\u{fafa}`);
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(unraw(raw`\u{fafa}test`), `\u{fafa}test`);
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(unraw(raw`test\u{fafa}`), `test\u{fafa}`);
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(unraw(raw`test\u{fafa}test`), `test\u{fafa}test`);
      });
    });

    context("\\u{000000000000000000005A5A} (leading zeros)", function(): void {
      it("should parse alone", function(): void {
        assert.strictEqual(
          unraw(raw`\u{000000000000000000005A5A}`),
          `\u{000000000000000000005A5A}`
        );
      });
      it("should parse with text after", function(): void {
        assert.strictEqual(
          unraw(raw`\u{000000000000000000005A5A}test`),
          `\u{000000000000000000005A5A}test`
        );
      });
      it("should parse with text before", function(): void {
        assert.strictEqual(
          unraw(raw`test\u{000000000000000000005A5A}`),
          `test\u{000000000000000000005A5A}`
        );
      });
      it("should parse with text around", function(): void {
        assert.strictEqual(
          unraw(raw`test\u{000000000000000000005A5A}test`),
          `test\u{000000000000000000005A5A}test`
        );
      });
    });

    describe("handles deeper escape levels", function(): void {
      context("\\\\u{5A5A} (even number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\u{5A5A}`), `\\u{5A5A}`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\u{5A5A}test`), `\\u{5A5A}test`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\u{5A5A}`), `test\\u{5A5A}`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(
            unraw(raw`test\\u{5A5A}test`),
            `test\\u{5A5A}test`
          );
        });
      });

      context("\\\\\\u{5A5A} (odd number of escapes)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\\\u{5A5A}`), `\\\u{5A5A}`);
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\\\u{5A5A}test`), `\\\u{5A5A}test`);
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\\\u{5A5A}`), `test\\\u{5A5A}`);
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(
            unraw(raw`test\\\u{5A5A}test`),
            `test\\\u{5A5A}test`
          );
        });
      });
    });

    describe("errors on invalid sequences", function(): void {
      context("\\u{} (zero digits)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u{FFFFFF} (too high)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{FFFFFF}`);
          }, new SyntaxError(
            "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
          ));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{FFFFFF}test`);
          }, new SyntaxError(
            "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
          ));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{FFFFFF}`);
          }, new SyntaxError(
            "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
          ));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{FFFFFF}test`);
          }, new SyntaxError(
            "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
          ));
        });
      });

      context("\\u{$$$$} (non-hex characters)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{$$$$}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{$$$$}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{$$$$}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{$$$$}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u{-1} (negative, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{-1}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{-1}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{-1}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{-1}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u{+1} (positive, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{+1}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{+1}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{+1}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{+1}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u{1.} (decimal, non-hex)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{1.}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text after", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{1.}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{1.}`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text around", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{1.}test`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
      });

      context("\\u{A (unclosed sequence)", function(): void {
        it("should error alone", function(): void {
          assert.throws(function(): void {
            unraw(`\\u{A`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
        });
        it("should error with text before", function(): void {
          assert.throws(function(): void {
            unraw(`test\\u{A`);
          }, new SyntaxError("malformed Unicode character escape sequence"));
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
    // NOTE: Octal escapes sequences are not allowed in template strings, but
    // they are in tagged template strings. Hence the inconsistency below

    context("with octals disallowed", function(): void {
      context("\\0 (not an octal sequence)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\0`, false), "\0");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\0test`, false), "\0test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\0`, false), "test\0");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\0test`, false), "test\0test");
        });
      });

      context("\\800 (not an octal sequence)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\800`, false), "800");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\800test`, false), "800test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\800`, false), "test800");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\800test`, false), "test800test");
        });
      });

      context("\\+1 (not an octal sequence)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\+1`, false), "+1");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\+1test`, false), "+1test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\+1`, false), "test+1");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\+1test`, false), "test+1test");
        });
      });

      describe("errors on octal sequences", function(): void {
        context("\\1 (single digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(raw`\1`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(raw`\1test`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\1`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\1test`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
        });

        context("\\00 (double digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(raw`\00`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(raw`\00test`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\00`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\00test`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
        });

        context("\\101 (triple digit)", function(): void {
          it("should error alone", function(): void {
            assert.throws(function(): void {
              unraw(raw`\101`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text after", function(): void {
            assert.throws(function(): void {
              unraw(raw`\101test`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text before", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\101`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
          it("should error with text around", function(): void {
            assert.throws(function(): void {
              unraw(raw`test\101test`, false);
            }, new SyntaxError(
              '"0"-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the "0o" prefix instead'
            ));
          });
        });
      });
    });

    context("with octals allowed", function(): void {
      // NOTE: Due to disallowing octals in strict mode, octal sequences are
      // changed for matching unicode sequences in 'expected' side

      context("\\0 (not an octal sequence)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\0`, true), "\0");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\0test`, true), "\0test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\0`, true), "test\0");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\0test`, true), "test\0test");
        });
      });

      context("\\+1 (not an octal sequence)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\+1`, false), "+1");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\+1test`, false), "+1test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\+1`, false), "test+1");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\+1test`, false), "test+1test");
        });
      });

      context("\\1 (single digit)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\1`, true), "\u0001");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\1test`, true), "\u0001test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\1`, true), "test\u0001");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\1test`, true), "test\u0001test");
        });
      });

      context("\\11 (two digits)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\11`, true), "\u0009");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\11test`, true), "\u0009test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\11`, true), "test\u0009");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\11test`, true), "test\u0009test");
        });
      });

      context("\\101 (three digits)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\101`, true), "\u0041");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\101test`, true), "\u0041test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\101`, true), "test\u0041");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\101test`, true), "test\u0041test");
        });
      });

      context("\\00 (minimum value)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\00`, true), "\u0000");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\00test`, true), "\u0000test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\00`, true), "test\u0000");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\00test`, true), "test\u0000test");
        });
      });

      context("\\377 (maximum value)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\377`, true), "\u00FF");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\377test`, true), "\u00FFtest");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\377`, true), "test\u00FF");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\377test`, true), "test\u00FFtest");
        });
      });

      context("\\400 (higher than maximum value)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\400`, true), "\u00200");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\400test`, true), "\u00200test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\400`, true), "test\u00200");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\400test`, true), "test\u00200test");
        });
      });

      context("\\119 (non-octal digit)", function(): void {
        it("should parse alone", function(): void {
          assert.strictEqual(unraw(raw`\119`, true), "\u00099");
        });
        it("should parse with text after", function(): void {
          assert.strictEqual(unraw(raw`\119test`, true), "\u00099test");
        });
        it("should parse with text before", function(): void {
          assert.strictEqual(unraw(raw`test\119`, true), "test\u00099");
        });
        it("should parse with text around", function(): void {
          assert.strictEqual(unraw(raw`test\119test`, true), "test\u00099test");
        });
      });
    });
  });
});
