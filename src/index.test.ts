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
  });
});
