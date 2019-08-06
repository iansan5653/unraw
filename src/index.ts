/**
 * @file **unraw** | Convert raw escape sequences to their respective characters
 * (undo `String.raw`).
 * @author Ian Sanders
 * @copyright 2019 Ian Sanders
 * @license MIT
 */

import {c} from "compress-tag";

/**
 * Matches every escape sequence possible, including invalid ones.
 */
const escapeMatch = /\\(\\|x[\s\S]{0,2}|u\{[^}]*\}|u[\s\S]{4}\\u([\s\S]{0,4})|u[\s\S]{0,4}|[0-7]{1,3}|[\s\S]|$)/g;

/**
 * Parse a hexadecimal escape code.
 * @param code The two-character hex code that represents the character to
 * output.
 * @throws {SyntaxError} If the code is not valid hex or is not the right
 * length.
 */
function parseHexadecimalCode(code: string): string {
  const codeNumber = parseInt(code, 16);
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
  const parsedCode = parseInt(code, 16);
  if (code.length !== 4 || Number.isNaN(parsedCode)) {
    // ie, "\u$$$$" or "\uF8"
    throw new SyntaxError("malformed Unicode character escape sequence");
  }

  let parsedSurrogateCode: number | undefined = undefined;
  if (surrogateCode !== undefined) {
    parsedSurrogateCode = parseInt(surrogateCode, 16);
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
 * @param codePoint A unicode escape code.
 * @throws {SyntaxError} If the code is not valid hex.
 */
function parseUnicodeCodePointCode(codePoint: string): string {
  const parsedCode = parseInt(codePoint, 16);
  if (Number.isNaN(parsedCode)) {
    // ie, "\u$$$$" or "\uF8"
    throw new SyntaxError("malformed Unicode character escape sequence");
  }

  return String.fromCodePoint(parsedCode);
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
    throw new SyntaxError(c`
      "0"-prefixed octal literals and octal escape sequences are deprecated; 
      for octal literals use the "0o" prefix instead
    `);
  } else {
    const parsedCode = parseInt(code, 8);
    return String.fromCharCode(parsedCode);
  }
}

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
  return raw.replace(
    escapeMatch,
    (_, sequence: string, surrogateCode?: string): string => {
      const ch = sequence.charAt(0);
      // End at 5 to exclude surrogate if present
      const code = sequence.substring(1, 5);
      if (ch.length === 0) {
        // NOTE: This is a deviation from normal behavior because this is
        // impossible in a normal string (String.raw`\` can never happen because
        // \ escapes `).
        throw new SyntaxError("malformed escape sequence at end of string");
      } else if(ch === "0" && sequence.length === 1) {
        // When length > 1, handled as octal
        return "\0";
      } else if (ch === "b") {
        return "\b";
      } else if (ch === "f") {
        return "\f";
      } else if (ch === "n") {
        return "\n";
      } else if (ch === "r") {
        return "\r";
      } else if (ch === "t") {
        return "\t";
      } else if (ch === "v") {
        return "\v";
      } else if (ch === "x") {
        return parseHexadecimalCode(sequence.substring(1));
      } else if (
        ch === "u" &&
        sequence.charAt(1) === "{" &&
        sequence.charAt(sequence.length - 1) === "}"
      ) {
        return parseUnicodeCodePointCode(
          sequence.substring(2, sequence.length - 1)
        );
      } else if (ch === "u") {
        return parseUnicodeCode(code, surrogateCode);
      } else if (!Number.isNaN(parseInt(ch, 10))) {
        return parseOctalCode(code, !allowOctals);
      } else {
        // "\\", "\"", "\'", "\A", "\9" ...
        return ch;
      }
    }
  );
}
