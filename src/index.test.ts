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
  describe("handles single character escape sequences", function(): void {
    context("\\b", function(): void {
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

    context("\\f", function(): void {
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

    context("\\n", function(): void {
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

    context("\\r", function(): void {
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

    context("\\t", function(): void {
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

    context("\\v", function(): void {
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

    context("\\0", function(): void {
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

    context("\\'", function(): void {
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

    context('\\"', function(): void {
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

    context("\\\\", function(): void {
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

    context("\\`", function(): void {
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

    context("\\$", function(): void {
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

    context("\\A", function(): void {
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
      context("\\x5 (wrong number of digits)", function(): void {
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

      it.skip("should have the right error", function(): void {
        /*
        let unrawErrorText = "";
        let jsErrorText = "";
        try {
          unraw(`\\x$$`);
        } catch (e) {
          unrawErrorText = e.toString();
        }
        try {
          "\x$$"; // This throws a syntax error in the TS compiler
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

      it.skip("should have the right error", function(): void {
        /*
        let unrawErrorText = "";
        let jsErrorText = "";
        try {
          unraw(raw`\u$$$$`);
        } catch (e) {
          unrawErrorText = e.toString();
        }
        try {
          "\u$$$$"; // Throws a syntax error in the TS compiler
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
        context("\\\\uDA99\uDD80 (even number of escapes)", function(): void {
          it("should parse alone", function(): void {
            assert.strictEqual(unraw(raw`\\uDA99\uDD80`), `\\uDA99\uDD80`);
          });
          it("should parse with text after", function(): void {
            assert.strictEqual(unraw(raw`\\uDA99\uDD80test`), `\\uDA99\uDD80test`);
          });
          it("should parse with text before", function(): void {
            assert.strictEqual(unraw(raw`test\\uDA99\uDD80`), `test\\uDA99\uDD80`);
          });
          it("should parse with text around", function(): void {
            assert.strictEqual(unraw(raw`test\\uDA99\uDD80test`), `test\\uDA99\uDD80test`);
          });
        });

        context("\\\\\\uDA99\uDD80 (odd number of escapes)", function(): void {
          it("should parse alone", function(): void {
            assert.strictEqual(unraw(raw`\\\uDA99\uDD80`), `\\\uDA99\uDD80`);
          });
          it("should parse with text after", function(): void {
            assert.strictEqual(unraw(raw`\\\uDA99\uDD80test`), `\\\uDA99\uDD80test`);
          });
          it("should parse with text before", function(): void {
            assert.strictEqual(unraw(raw`test\\\uDA99\uDD80`), `test\\\uDA99\uDD80`);
          });
          it("should parse with text around", function(): void {
            assert.strictEqual(unraw(raw`test\\\uDA99\uDD80test`), `test\\\uDA99\uDD80test`);
          });
        });
      });

      describe("errors on invalid sequences", function(): void {
        // TODO
      });
    });
  });
});
