/*! otinput v1.0.0 */
(function(){
'use strict';
function oTinput(config){
    var that = this;
    this.element = this._setupElement(config.element);
    this._onFileChange = config.onFileChange || function(){};
    this._onFileError = config.onFileError || function(){};
    
    $(this.element).find('input[type="file"]').change(function() {
        that._reactToFile(this);
    });   
}
window.oTinput = oTinput;
oTinput.prototype._setupElement = function(element){
    if (typeof element === 'undefined') {
        throw('must specify container element');
    }
    $(element).html('<input type="file" accept="audio/*, video/*">');
    return $(element)[0];
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

}());