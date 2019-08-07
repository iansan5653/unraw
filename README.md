# unraw

Unraw is a small module that converts raw strings to parsed strings in the same
manner as the standard JavaScript escaping engine. In essence, it is the exact
opposite of
[`String.raw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw).

## Use Case
Most of the time, you probably don't need this library unless you're working
directly with raw strings and you need a way to get them back to normal strings.
Maybe the most signicant use case is when building
[template literal tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates);
you can use the `.raw` property of the passed string array to access the raw
strings, but then you may want to still return normal strings after processing.

## Installation
This is a UMD module.

`unraw` is hosted on [NPM](https://www.npmjs.com/unraw):
```bash
npm i unraw
```

You can embed it (minified) on a webpage with [UNPKG](https://unpkg.com): 
https://unpkg.com/unraw

## Usage
Usage is simple - the library exports just one function, `unraw`. The first
argument to `unraw` is the string to parse, and the second is an optional flag
to allow or disallow octal escapes, which are deprecated (defaults to
`false`, so the default behavior is to throw an error when octal sequences
are encountered).

```js
import unraw from "unraw";

unraw("\\t\\tThis is indented.");
// => "		This is indented."
```

The library attempts to mimic the behaviour of standard JavaScript strings as
closely as possible. This means that invalid escape sequences will throw
`SyntaxError`s and that every escape sequence that is valid in a normal string
should be valid when passed to `unraw`.

In some ways this is similar to the behavior of `JSON.parse`.

You can always expect the outcome of calling `unraw` on a raw string to be
exactly the same as if that string were not raw in the first place:

```js
`Invalid: \u23`                   // Throws a SyntaxError
unraw(String.raw`Invalid: \u23`)  // Throws a SyntaxError

`Valid: \u0041`                   // => `Valid: A`
unraw(String.raw`Valid: \u0041`)  // => `Valid: A`

`Valid: \A`                       // => `Valid: A`
unraw(String.raw`Valid: \A`)      // => `Valid: A`

`Valid: \\`                       // => `Valid: \`
unraw(String.raw`Valid: \\`)      // => `Valid: \`

`Valid: \x42`                     // => `Valid: B`
unraw(String.raw`Valid: \x42`)    // => `Valid: B`

`Octal: \102`                      // => Throws a SyntaxError
unraw(String.raw`Octal: \102`)     // => Throws a SyntaxError
unraw(String.raw`Octal: \102`, true) // => Octal: B
```

## Contributing

Found a bug? Please, 
[submit it here.](https://github.com/iansan5653/compress-tag/issues)

Pull requests are always welcome, although to increase your chances of your
contribution being accepted, opening an issue and linking to it is always a
good idea.

Pull requests will not be merged unless the Azure Pipelines build succeeds.
This means that all checks must pass and code must be free of lint errors. To
quickly confirm that it will, just run:
```bash
npm run check
```
This checks your formatting, tests, and for TypeScript compiler errors. If the
task doesn't fail, you should be good to go.
