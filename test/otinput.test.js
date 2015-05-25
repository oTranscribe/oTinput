var exMp3 = 'https://raw.githubusercontent.com/ejb/progressor.js/gh-pages/demos/discipline.mp3';
var exYt = 'https://www.youtube.com/watch?v=N9XKLqGqwLA';

QUnit.test( "Returns list of supported file formats", function( assert ) { 
    assert.equal( typeof oTinput.getSupportedFormats().audio.length, 'number' );
    assert.equal( typeof oTinput.getSupportedFormats().video.length, 'number' );
});

QUnit.test( "Tests file format", function( assert ) { 
    assert.ok( !oTinput.isFormatSupported('blah') );
});

QUnit.test( "Sets up element", function( assert ) { 
    var input = new oTinput({
        element: '.test'
    });
    assert.equal( $('.test input').attr('type'), 'file' );
});

QUnit.test( "Show/hide external element input", function( assert ) { 
    var input = new oTinput({
        element: '.test'
    });
    $('.alt-input-button').click();
    assert.equal( $('.ext-input-field').css('display'), 'block' );
    $('.close-ext-input').click();
    assert.equal( $('.ext-input-field').css('display'), 'none' );
    input.showURLInput();
    assert.equal( $('.ext-input-field').css('display'), 'block' );
    input.showFileInput();
    assert.equal( $('.ext-input-field').css('display'), 'none' );
});

/*

QUnit.test( "Load external file", function( assert ) {
    var done = assert.async();
    var input = new oTinput({
        element: '.test',
        onURLSubmit: function(url){
            assert.equal(url, exMp3);
            done();
        }
    });
    input._reactToURL( exMp3 );
});

QUnit.test( "Load youtube video", function( assert ) { 
    var input = new oTinput({
        element: '.test'
    });
    $('.alt-input-button').click();
    $('.ext-input-field input').val(exYt).submit();
});

*/

