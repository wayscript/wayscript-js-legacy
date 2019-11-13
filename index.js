/**
 * --------------------------------------------------------------------------
 * WayScript, Inc.: wayscript.js
 * Licensed under MIT (https://github.com/wayscript/wayscript-js/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

( function ( root, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define( [ 'xmlhttprequest', 'buffer' ], factory  );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory( require( 'xmlhttprequest' ).XMLHttpRequest, require( 'buffer' ).Buffer );
    } else {
        root.wayscript = factory( root.XMLHttpRequest, root.Buffer );
    }
} )( typeof global !== "undefined" ? global : this.window || this.global, function ( XMLHttpRequest, Buffer ) {
    'use strict';

    const wayScript = {};

    wayScript.apiKey = '';
    wayScript.username = '';
    wayScript.password = '';

    wayScript.run = function ( programId, endpoint = '', params = null, data = null ) {
        let query_param_str = '';
        endpoint = encodeURIComponent( endpoint || '' );

        if ( params ) {
            for ( let [key, value] of Object.entries( params ) ) {
                query_param_str += query_param_str.length > 0 ? '&' : '?';
                query_param_str += encodeURIComponent( key ) + '=' + encodeURIComponent( value );
            }
        }

        return _post( programId, endpoint, query_param_str, data );
    };

    const _post = function ( program_id, endpoint, query_param_str, body_params ) {
        let xhr = new XMLHttpRequest();
        const request_url = 'https://' + program_id + '.wayscript.com/' + endpoint + query_param_str;
        xhr.open( "POST", request_url );
        xhr.setRequestHeader( "Content-Type", "application/json" );
        xhr.setRequestHeader( "X-WayScript-Api", "javascript" );

        const auth_header = _get_auth_header();
        if ( auth_header ) xhr.setRequestHeader( "Authorization", auth_header );

        const response = {};
        response.requestUrl = request_url;
        response.authorizationHeader = auth_header;
        response.requestParams = query_param_str;
        response.requestBody = body_params;

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

        xhr.send( JSON.stringify( body_params || { } ) );

        return response;
    };

    const _get_auth_header = function() {
        if ( wayScript.apiKey ) {
            if ( wayScript.apiKey.length !== 43 ) {
                throw new Error( 'The API Key provided is not valid.' );
            }
            return 'Bearer ' + wayScript.apiKey;
        }
        else if ( wayScript.username && wayScript.password ) {
            return 'Basic ' + _get_base64_string( wayScript.username + ':' + wayScript.password );
        }
        return null;
    };

    const _get_base64_string = function( str ) {
        if ( typeof btoa === "function" ) {
            return btoa( str );
        } else {
            return Buffer.from( str ).toString( 'base64' );
        }
    };

    return wayScript;
} );
