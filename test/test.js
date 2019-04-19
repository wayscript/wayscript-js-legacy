const expect = require( 'chai' ).expect,
    wayscript = require( '../js/wayscript' );

describe( 'wayscript', function () {
    const dummy_api_key = "_DUMMY_API_KEY_DUMMY_API_KEY_DUMMY_API_KEY_";
    const program_id = 1234;
    const variables = [ 'one', 'two', 'three' ];

    it( 'should allow api key assignment', function () {
        expect( wayscript.apiKey ).to.be.equal( '' );
        wayscript.apiKey = 'foobar';
        expect( wayscript.apiKey ).to.be.equal( 'foobar' );
    } );

    it( 'should throw on invalid api key', function () {
        wayscript.apiKey = 'foobar';
        expect( wayscript.apiKey ).to.be.equal( 'foobar' );
        expect( function () {
            wayscript.runProgram();
        } ).to.throw( 'The API Key provided is not valid.' );
    } );

    it( 'should run program', function () {
        wayscript.apiKey = dummy_api_key;
        expect( function () {
            wayscript.runProgram( program_id );
        } ).to.not.throw();
    } );

    it( 'should run program with variables', function () {
        expect( function () {
            wayscript.runProgram( program_id, variables );
        } ).to.not.throw();
    } );

    it( 'should run program with empty variables', function () {
        expect( function () {
            wayscript.runProgram( program_id, [] );
        } ).to.not.throw();
    } );

    it( 'should allow onerror/onsuccess assignment', function ( done ) {
        const onError = function onError( text ) {
            expect( text ).to.be.equal( '{"Error":"Invalid API key."}' );
            done();
        };

        const onSuccess = function onError( text ) {
        };

        let response = wayscript.runProgram( program_id, variables )
            .onError( onError )
            .onSuccess( onSuccess );

        expect( response._onError ).to.be.equal( onError );
        expect( response._onSuccess ).to.be.equal( onSuccess );
    } );
} );
