/*! otinput v1.0.0 */
(function(){
'use strict';
oTinput.prototype.getSupportedFormats = function(){
    var potentialFormatsAudio = ['mp3', 'ogg', 'webm', 'wav'];
    var potentialFormatsVideo = ['mp4', 'ogg', 'webm'];
    var isFormatSupported = this.isFormatSupported || oTinput.isFormatSupported;
    var audio = $.map( potentialFormatsAudio, function( format, i ) {
        if (isFormatSupported(format)){
            return format;
        }
    });
    var video = $.map( potentialFormatsVideo, function( format, i ) {
        if (isFormatSupported(format)){
            return format;
        }
    });
    return {
        audio: audio,
        video: video
    };
};
oTinput.prototype.isFormatSupported = function( format ){
    var a;
    if (typeof format !== 'string') {
        var fileType = format.type.split("/")[0];
        a = document.createElement(fileType);
        return !!(a.canPlayType && a.canPlayType(format.type).replace(/no/, ''));
    }
    a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/'+format+';').replace(/no/, ''));
};
oTinput.getSupportedFormats = oTinput.prototype.getSupportedFormats;
oTinput.isFormatSupported = oTinput.prototype.isFormatSupported;

oTinput.prototype.parseYoutubeURL = function(url){
    if (url.match) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[2].length===11){
            return match[2];
        }
    }
    return false;
};
oTinput.parseYoutubeURL = oTinput.prototype.parseYoutubeURL;

function oTinput(config){
    var that = this;
    this._text = config.text || {};
    this._onFileChange = config.onFileChange || function(){};
    this._onFileError = config.onFileError || function(){};
    this._onURLSubmit = config.onURLSubmit || function(){};
    this._onURLError = config.onURLError || function(){};
    this._dragover = config.onDragover || function(){};
    this._dragleave = config.onDragleave || function(){};
    this.element = this._setupElement(config.element);
    this._setupMouseEvents();
    
    $(this.element).find('input[type="file"]').change(function(){
        that._reactToFile(this);
    });
    $(this.element).find('.ext-input-field input').on('submit',function(){
        that._reactToURL( $(this).val() );
    }).keypress(function(e){
        if (e.which === 13) {
            that._reactToURL( $(this).val() );
            return false;
        }
    });    
}
window.oTinput = oTinput;
oTinput.prototype._setupElement = function(element){
    var that = this;
    if (typeof element === 'undefined') {
        throw('must specify container element');
    }
    var buttonText = this._text.button || 'Choose audio (or video) file';
    var button = '<button class="btn-file-input" style="width: 100%;">'+buttonText+'</button>';
    var fileInputStyle = [
        'position: absolute',
        'top: 0',
        'left: 0',
        'opacity: 0',
        'width: 100%'
    ].join(';');
    var fileInput = '<input type="file" accept="audio/*, video/*" style="'+fileInputStyle+'">';
    var wrapperStyle = 'position: relative; overflow: hidden;';
    var wrapper = '<div class="file-input-wrapper" style="'+wrapperStyle+'">'+button+fileInput+'</div>';
    var altButtonText = this._text.altButton || 'Enter file URL';
    var altButton = '<button class="alt-input-button">'+altButtonText+'</button>';
    var urlInputText = this._text.altInputText || 'Enter URL of audio or video file, or YouTube video:';
    var urlInputClose = this._text.closeAlt || 'close';
    var urlInput = '<div class="ext-input-field" style="display: none;"><div class="close-ext-input">'+urlInputClose+'</div><label>'+urlInputText+'<input type="text"></label><div class="ext-input-warning"></div></div>';
    $(element).html( wrapper + altButton + urlInput ); 
    return $(element)[0];
};
oTinput.prototype._setupMouseEvents = function(){
    var that = this;
    var element = this.element;
    var buttonEl = $(element).find('.file-input-wrapper')[0];
    buttonEl.addEventListener('dragover', function(){
        that._dragover();
    }, false);
    buttonEl.addEventListener('dragleave', function(){
        that._dragleave();
    }, false);
    $(element).find('.alt-input-button').click(function(){
        that.showURLInput();
    });    
    $(element).find('.close-ext-input').click(function(){
        that.showFileInput();
    });
};
oTinput.prototype._reactToFile = function(input){
    var file = input.files[0];
    if ( this.isFormatSupported(file) ) {
        this._onFileChange( file );
    } else {
        var err = new Error('Filetype '+file.type+' not supported by this browser');
        this._onFileError(err, file);
    }
};
oTinput.prototype._reactToURL = function(url){
    var input = url.replace(/\s/g,'');
    if (this.parseYoutubeURL(input)){
        return this._onURLSubmit( input );
    }
    var formatArr = input.split('.');
    var format = formatArr[formatArr.length-1];
    if ( this.isFormatSupported(format) ) {
        this._onURLSubmit( input );
    } else {
        var err = new Error('Filetype '+format+' not supported by this browser');
        this._onURLError(err, url);
    }
};
oTinput.prototype.showURLInput = function(){
    $(this.element).find('.ext-input-field').show().find('input').focus();
    $(this.element).addClass('ext-input-active');
};
oTinput.prototype.showFileInput = function(){
    $(this.element).find('.ext-input-field').hide();
    $(this.element).removeClass('ext-input-active');
};

}());