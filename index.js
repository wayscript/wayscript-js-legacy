/**
 * --------------------------------------------------------------------------
 * WayScript, Inc.: wayscript.js
 * Licensed under MIT (https://github.com/wayscript/wayscript-js/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

( function ( root, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define( factory( root ) );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory( require( 'xmlhttprequest' ) );
    } else {
        root.wayscript = factory( root );
    }
} )( typeof global !== "undefined" ? global : this.window || this.global, function ( root ) {
    'use strict';

    const wayScript = {};

    wayScript.apiKey = '';

    wayScript.runProgram = function ( programId, variables ) {
        if ( !wayScript.apiKey || wayScript.apiKey.length !== 43 ){
            throw new Error( 'The API Key provided is not valid.' );
        }

        let params = '?api_key=' + wayScript.apiKey + '&program_id=' + programId;

        if ( variables && variables.length ) {
            for ( let variable of variables ) {
                params += '&variables=' + variable;
            }
        }

        return _post( params );
    };

    const _post = function ( params ) {
        let xhr = new root.XMLHttpRequest();
        xhr.open( "POST", 'https://wayscript.com/api' + params );
        xhr.setRequestHeader( "Content-Type", "application/json" );
        xhr.setRequestHeader( "X-WayScript-Api", "javascript" );

        const response = {};
        response.requestParams = params;

        response.onSuccess = function( func ) {
            response._onSuccess = func;
            return response;
        };

        response.onError = function( func ) {
            response._onError = func;
            return response;
        };

        xhr.onreadystatechange = function () {
            if ( xhr.readyState === 4 ) {
                if ( xhr.status === 200 ) {
                    if ( response._onSuccess ) {
                        response._onSuccess( xhr.responseText );
                    }
                } else if ( response._onError ) {
                    response._onError( xhr.responseText );
                }
            }
        };

        xhr.send();

        return response;
    };

    return wayScript;
} );
