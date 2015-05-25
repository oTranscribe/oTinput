# oTinput

A dynamic file input form developed for [oTranscribe](http://github.com/otranscribe/otranscribe). Creates simple, user-friendly form for selecting local audio/video files, which can then be played audio or video in-browser. Combine with oTplayer for an awesome combo.

## Install

Download [otinput.js](dist/otinput.js) or [otinput.min.js](dist/otinput.min.js) and include it in your page along with jQuery.

## Usage

Initialise a new instance of oTinput like so:

```js
var input = new oTinput({
  element: '.my-input-holder',
  onFileChange: function(file){
    console.log('File name is: '+file.name);
  },
  onURLSubmit: function(url){
    console.log('URL is: '+url);
  }
});
```

`onFileChange` and `onURLSubmit` are run whenever a valid file or URL is submitted by the user.

Note that oTinput does **not** include any styles.

### Config options

All of these are optional apart from `element`.

- `element`: Selector, or element, to contain input buttons.
- `onFileChange(file)` - callback for when file changes. Callback argument is [File object](https://developer.mozilla.org/en/docs/Web/API/File).
- `onFileError(error, file)`: Callback for when file is unsupported or otherwise invalid. Callback arguments are [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and [File object](https://developer.mozilla.org/en/docs/Web/API/File).
- `onDragover()`: Callback function for when a file is dragged over the input and can be dropped.
- `onDragleave()`: Callback function for when a file is dragged away from the input.
- `onURLSubmit(url)`: Callback function for when valid URL is submitted. Callback argument is the submitted URL
- `onURLError(error, url)`: Callback function for when URL's filetype is unsupported or otherwise invalid. Callback arguments are [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and the submitted URL.
- `text`: Object used to specify custom replacements to default text.
  - `button`: Default is "Choose audio (or video) file".
  - `altButton`: Default is "Enter file URL".
  - `altInputText`: Default is "Enter URL of audio or video file, or YouTube video:"
  - `closeAlt`: Default is "close"

### Methods

- `showURLInput()`: Switch to secondary input for URLs.
- `showFileInput()`: Return to primary input for files.
- `getSupportedFormats()`: Returns an object with properties 'audio' and 'video', each containing arrays of supported filetypes. Can also be used without initialising object.

        var formats = oTplayer.getSupportedFormats();
        formats;       // { audio: ["mp3", "wav"], video: ["mp4"] }
        formats.audio; // ["mp3", "wav"]
        formats.video; // ["mp4"]

- `isFormatSupported(filetype)`: Returns true if file format is supported by current browser. Can also be used without initialising object:

        oTplayer.isFormatSupported('mp3');
        
## Browser support

oTinput requires the [File API](http://caniuse.com/#search=file), so only supports modern browsers.

## Building dist folder

- Install [Node and npm](https://nodejs.org) and [Grunt](http://gruntjs.com)
- Run `npm install`
- Run `grunt`

## Running tests

- Build dist folder
- Run `grunt test`