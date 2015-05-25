function oTinput(config){
    var that = this;
    this._text = config.text || {};
    this._onFileChange = config.onFileChange || function(){};
    this._onFileError = config.onFileError || function(){};
    this._dragover = config.onDragover || function(){};
    this._dragleave = config.onDragleave || function(){};
    this.element = this._setupElement(config.element);
    
    $(this.element).find('input[type="file"]').change(function() {
        that._reactToFile(this);
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
    $(element).html( wrapper );
    
    var buttonEl = $(element).find('.file-input-wrapper')[0];
    buttonEl.addEventListener('dragover', function(){
        that._dragover();
    }, false);
    buttonEl.addEventListener('dragleave', function(){
        that._dragleave();
    }, false);
    
    // '<div class="yt-input" data-l10n-id="choose-youtube">or YouTube video</div>
    // <div class="ext-input-field">
    //     <div class="close-ext-input"><i class="fa fa-times"></i></div>
    //     <label data-l10n-id="youtube-instrux">Enter YouTube video URL:
    //         <input type="text">
    //     </label>
    //     <div class="ext-input-warning"></div>
    // </div>'
    
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
