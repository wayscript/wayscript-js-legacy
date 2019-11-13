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
        let xhr = new root.XMLHttpRequest();
        xhr.open( "POST", 'https://' + program_id + '.wayscript.com/' + endpoint + query_param_str );
        xhr.setRequestHeader( "Content-Type", "application/json" );
        xhr.setRequestHeader( "X-WayScript-Api", "javascript" );

        const auth_header = _get_auth_header();
        if ( auth_header ) xhr.setRequestHeader( "Authorization", auth_header );

        const response = {};
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

        if ( body_params ) {
            xhr.send( JSON.stringify( body_params ) );
        } else {
            xhr.send();
        }

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
            return 'Basic ' + btoa( wayScript.username + ':' + wayScript.password );
        }
        return null;
    };

    return wayScript;
} );
