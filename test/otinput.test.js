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
