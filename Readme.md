# oTinput

oTranscribe's file input system.

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
- onDragover: callback for when a file is dragged over the input and can be dropped
- onDragleave: callback for when a file is dragged away from the input
- onURLSubmit - callback for when valid URL is submitted. Callback argument is the submitted URL
- onURLError - callback for when URL's filetype is unsupported or otherwise invalid. Callback arguments are [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and the submitted URL

- text: object
  - button
  - altButton
  - altInputText
  - closeAlt
  

## Methods

- showURLInput
- showFileInput
- isFormatSupported ( filetype as string ) - also works without initialising object
- getSupportedFormats (returns object with 'audio' and 'video' arrays of filetype names) - also works without initialising object

