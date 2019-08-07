/**
 * @file **unraw** | Convert raw escape sequences to their respective characters
 * (undo `String.raw`).
 * @author Ian Sanders
 * @copyright 2019 Ian Sanders
 * @license MIT
 */

/**
 * Parse a string as a base-16 number. This is more strict than parseInt as it
 * will not allow any other characters, including (for example) "+", "-", and
 * ".".
 * @param hex A string containing a hexadecimal number.
 */
function hexToInt(hex: string): number {
  if (hex.match(/[^a-f0-9]/i) !== null) {
    // Matches the first non-hex symbol in the string
    return NaN;
  } else {
    return parseInt(hex, 16);
  }
}

/**
 * Parse a hexadecimal escape code.
 * @param code The two-character hex code that represents the character to
 * output.
 * @throws {SyntaxError} If the code is not valid hex or is not the right
 * length.
 */
function parseHexadecimalCode(code: string): string {
  const codeNumber = hexToInt(code);
  if (code.length !== 2 || Number.isNaN(codeNumber)) {
    // ie, "\xF" or "\x$$"
    throw new SyntaxError("malformed hexadecimal character escape sequence");
  }
  return String.fromCharCode(codeNumber);
}

/**
 * Parse a Unicode escape code.
 * @param code The four-digit unicode number that represents the character to
 * output.
 * @param surrogateCode The four-digit unicode surrogate that represents the
 * character to output.
 * @throws {SyntaxError} If the codes are not valid hex or are not the right
 * length.
 */
function parseUnicodeCode(code: string, surrogateCode?: string): string {
  const parsedCode = hexToInt(code);
  if (code.length !== 4 || Number.isNaN(parsedCode)) {
    // ie, "\u$$$$" or "\uF8"
    throw new SyntaxError("malformed Unicode character escape sequence");
  }

  if (surrogateCode !== undefined) {
    const parsedSurrogateCode = hexToInt(surrogateCode);
    if (surrogateCode.length !== 4 || Number.isNaN(parsedSurrogateCode)) {
      // ie, "\u00FF\uF" or "\u00FF\u$$$$"
      throw new SyntaxError("malformed Unicode character escape sequence");
    }
    return String.fromCharCode(parsedCode, parsedSurrogateCode);
  }

  return String.fromCharCode(parsedCode);
}

/**
 * Parse a Unicode code point escape code.
 * @param codePoint A unicode escape code, including the surrounding curly
 * braces.
 * @throws {SyntaxError} If the code is not valid hex or does not have the
 * surrounding curly braces.
 */
function parseUnicodeCodePointCode(codePoint: string): string {
  const lastIndex = codePoint.length - 1;
  const parsedCode = hexToInt(codePoint.substring(1, lastIndex));
  if (
    codePoint.charAt(0) !== "{" ||
    codePoint.charAt(lastIndex) !== "}" ||
    Number.isNaN(parsedCode)
  ) {
    // ie, "\u$$$$" or "\uF8"
    throw new SyntaxError("malformed Unicode character escape sequence");
  }
  try {
    return String.fromCodePoint(parsedCode);
  } catch (err) {
    if (err instanceof RangeError) {
      throw new SyntaxError(
        "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
      );
    } else {
      throw err;
    }
  }
}

/**
 * Parse an octal escape code.
 * @param code An octal escape code. Assumed to be valid because an invalid
 * octal escape code will never be matched.
 * @param error If `true`, will throw an error without attempting to parse the
 * code.
 * @throws {SyntaxError} Only if `throw` is `true`.
 */
function parseOctalCode(code: string, error: false): string;
function parseOctalCode(code: string, error: true): never;
// Have to give overload that takes boolean for when compiler doesn't know if
// true or false
function parseOctalCode(code: string, error: boolean): string | never;
function parseOctalCode(code: string, error: boolean = false): string | never {
  if (error) {
    throw new SyntaxError(
      '"0"-prefixed octal literals and octal escape sequences are ' +
      'deprecated; for octal literals use the "0o" prefix instead'
    );
  } else {
    // The original regex only allows digits so we don't need to have a strict
    // octal parser like hexToInt
    const parsedCode = parseInt(code, 8);
    return String.fromCharCode(parsedCode);
  }
}

/**
 * Parse a single character escape sequence and return the matching character.
 * If none is matched, returns `code`. Naively assumes `code.length == 1`.
 * @param code A single character code.
 */
function parseSingleCharacterCode(code: string): string {
  switch (code) {
    case "b":
      return "\b";
    case "f":
      return "\f";
    case "n":
      return "\n";
    case "r":
      return "\r";
    case "t":
      return "\t";
    case "v":
      return "\v";
    case "0":
      return "\0";
    default:
      // Handles quotes and backslashes as well as anything else
      return code;
  }
}

/**
 * Matches every escape sequence possible, including invalid ones.
 *
 * All capture groups (described below) are unique (only one will match), except
 * for 3 and 4 which always match together.
 *
 * **Capture Groups:**
 * 0. A single backslash
 * 1. Hexadecimal code
 * 2. Unicode code point code with surrounding curly braces
 * 3. Unicode escape code with surrogate
 * 4. Surrogate code
 * 5. Unicode escape code without surrogate
 * 6. Octal code _NOTE: includes "0"._
 * 7. A single character (will never be \, x, u, or 0-3)
 */
const escapeMatch = /\\(?:(\\)|x([\s\S]{0,2})|u(\{[^}]*\}?)|u([\s\S]{4})\\u([^{][\s\S]{0,3})|u([\s\S]{0,4})|([0-3]?[0-7]{1,2})|([\s\S])|$)/g;

/**
 * Replace raw escape character strings with their escape characters.
 * @param raw A string where escape characters are represented as raw string
 * values like `\'` rather than `'`.
 * @param allowOctals If `true`, will process the now-deprecated octal escape
 * sequences (ie, `\111`).
 * @returns The processed string, with escape characters replaced by their
 * respective actual Unicode characters.
 */
export default function unraw(
  raw: string,
  allowOctals: boolean = false
): string {
  return raw.replace(escapeMatch, function(
    _,
    backslash?: string,
    hex?: string,
    codePoint?: string,
    unicodeWithSurrogate?: string,
    surrogate?: string,
    unicode?: string,
    octal?: string,
    singleCharacter?: string
  ): string {
    // Compare groups to undefined because empty strings mean different errors
    // Otherwise, `\u` would fail the same as `\` which is wrong.
    if (backslash !== undefined) {
      return "\\";
    } else if (singleCharacter !== undefined) {
      return parseSingleCharacterCode(singleCharacter);
    } else if (hex !== undefined) {
      return parseHexadecimalCode(hex);
    } else if (codePoint !== undefined) {
      return parseUnicodeCodePointCode(codePoint);
    } else if (unicodeWithSurrogate !== undefined) {
      return parseUnicodeCode(unicodeWithSurrogate, surrogate);
    } else if (unicode !== undefined) {
      return parseUnicodeCode(unicode);
    } else if (octal === "0") {
      return "\0";
    } else if (octal !== undefined) {
      return parseOctalCode(octal, !allowOctals);
    } else {
      throw new SyntaxError("malformed escape sequence at end of string");
    }
  });
}
