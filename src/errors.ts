/**
 * @file **unraw - errors.ts** | Error messages used by `unraw`.
 * @author Ian Sanders
 * @copyright 2019 Ian Sanders
 * @license MIT
 */

// NOTE: don't construct errors here or they'll have the wrong stack trace.
// NOTE: don't make custom error class; the JS engines use `SyntaxError`

/** The name of an error message. */
export type ErrorMessageName =
  | "malformedUnicode"
  | "malformedHexadecimal"
  | "codePointLimit"
  | "octalDeprecation"
  | "endOfString";

/** Map of error message names to the full text of the message. */
export const errorMessages = new Map<ErrorMessageName, string>([
  ["malformedUnicode", "malformed Unicode character escape sequence"],
  ["malformedHexadecimal", "malformed hexadecimal character escape sequence"],
  [
    "codePointLimit",
    "Unicode codepoint must not be greater than 0x10FFFF in escape sequence"
  ],
  [
    "octalDeprecation",
    '"0"-prefixed octal literals and octal escape sequences are deprecated; ' +
      'for octal literals use the "0o" prefix instead'
  ],
  ["endOfString", "malformed escape sequence at end of string"]
]);
