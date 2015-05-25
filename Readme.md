# Blank module template

This is a template for JavaScript module projects.

## Repo structure

- dist: Production-ready files
- src: Uncompiled source
- test: Unit tests
- examples: Demos of plugin in action

## Building dist folder

- Install [Node and npm](https://nodejs.org) and [Grunt](http://gruntjs.com)
- Run `npm install`
- Run `grunt`

## Running tests

- Build dist folder
- Run `grunt test`

## Config options

- element * (input element)
- onFileChange - callback for when file changes. Callback argument is [File object](https://developer.mozilla.org/en/docs/Web/API/File)
- onFileError - callback for when file is unsupported or otherwise invalid. Callback arguments are [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and [File object](https://developer.mozilla.org/en/docs/Web/API/File)

## Methods

- isFormatSupported ( filetype as string ) - also works without initialising object
- getSupportedFormats (returns object with 'audio' and 'video' arrays of filetype names) - also works without initialising object
