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
