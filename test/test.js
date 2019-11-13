const expect = require( 'chai' ).expect,
    wayscript = require( '../' );

describe( 'wayscript', function () {
    const DUMMY_API_KEY = "_DUMMY_API_KEY_DUMMY_API_KEY_DUMMY_API_KEY_";
    const PROGRAM_ID    = 1234;
    const QUERY_PARAMS  = { 'var1': 'one,', 'var2': 'two&', 'var3': 'three?' };
    const BODY_PARAMS   = { 'var4': 'four,', 'var5': 'five?', 'var6': 'six:' };

    it( 'should allow api key assignment', function () {
        expect( wayscript.apiKey ).to.be.equal( '' );
        wayscript.apiKey = 'foobar';
        expect( wayscript.apiKey ).to.be.equal( 'foobar' );
    } );

    it( 'should allow username and password assignment', function () {
        expect( wayscript.username ).to.be.equal( '' );
        expect( wayscript.password ).to.be.equal( '' );
        wayscript.username = 'captain@wayscript.com';
        wayscript.password = 'letmein';
        expect( wayscript.username ).to.be.equal( 'captain@wayscript.com' );
        expect( wayscript.password ).to.be.equal( 'letmein' );
    } );

    it( 'should throw on invalid api key', function () {
        wayscript.apiKey = 'foobar';
        expect( wayscript.apiKey ).to.be.equal( 'foobar' );
        expect( function () {
            wayscript.run();
        } ).to.throw( 'The API Key provided is not valid.' );
    } );

    it( 'should run program', function () {
        wayscript.apiKey = DUMMY_API_KEY;
        expect( function () {
            wayscript.run( PROGRAM_ID );
        } ).to.not.throw();
    } );

    it( 'should run program with query params', function () {
        expect( function () {
            wayscript.run( PROGRAM_ID, params = QUERY_PARAMS );
        } ).to.not.throw();
    } );

    it( 'should run program with empty query params', function () {
        expect( function () {
            wayscript.run( PROGRAM_ID, {} );
        } ).to.not.throw();
    } );

    it( 'should run program with body params', function () {
        expect( function () {
            wayscript.run( PROGRAM_ID, data = BODY_PARAMS );
        } ).to.not.throw();
    } );

    it( 'should run program with empty body params', function () {
        expect( function () {
            wayscript.run( PROGRAM_ID, {} );
        } ).to.not.throw();
    } );

    it( 'should run program with endpoint', function () {
        expect( function () {
            wayscript.run( PROGRAM_ID, 'My%20Function' );
        } ).to.not.throw();
    } );

    it( 'should run program with endpoint and params', function () {
        expect( function () {
            wayscript.run( PROGRAM_ID, 'My%20Function', params = QUERY_PARAMS, data = BODY_PARAMS );
        } ).to.not.throw();
    } );

    it( 'should allow onerror/onsuccess assignment', function ( done ) {
        const onError = function onError( text ) {
            expect( text ).to.be.equal( '{"Error":"Invalid API key."}' );
            done();
        };

        const onSuccess = function onSuccess( text ) {
        };

        let response = wayscript.run( PROGRAM_ID, 'My Function', params = QUERY_PARAMS, data = BODY_PARAMS )
            .onError( onError )
            .onSuccess( onSuccess );

        expect( response._onError ).to.be.equal( onError );
        expect( response._onSuccess ).to.be.equal( onSuccess );
        expect( response.requestParams ).to.be.equal( '?var1=one%2C&var2=two%26&var3=three%3F' );
        expect( response.requestBody ).to.be.equal( BODY_PARAMS );
    } );
} );
