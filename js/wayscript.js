/**
 * --------------------------------------------------------------------------
 * WayScript, Inc.: wayscript.js
 * Licensed under MIT (https://github.com/wayscript/wayscript-js/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.wayscript = factory();
  }
})(typeof global !== "undefined" ? global : this.window || this.global, function () {
    'use strict';

    const wayScript = {};
    let apiKey = '';

    wayScript.runProgram = function( programId, variables, runAsync ) {
        if ( runAsync === undefined ) {
            runAsync = false;
        }

        let params = { 'api_key': apiKey, 'program_id': programId, 'run_async': runAsync };

        if ( variables && variables.length ) {
            params[ 'variables' ] = variables;
        }

        _post( params, runAsync );
    };

    wayScript.onSuccess = function( responseText ) { };

    wayScript.onError = function( statusText ) { };

    const _post = function( params, runAsync ) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://wayscript.com/api', runAsync );
        xhr.setRequestHeader( "Content-Type", "application/json" );
        xhr.setRequestHeader( "X-WayScript-Api", "javascript" );

        if ( runAsync ) {
            xhr.onload = function() {
                if ( xhr.readyState === 4 ) {
                    if ( xhr.status === 200 ) {
                        if ( wayScript.onSuccess ) {
                            wayScript.onSuccess( xhr.responseText );
                        }
                    } else if ( wayScript.onError ) {
                        wayScript.onError( xhr.statusText );
                    }
                }
            };
        }

        xhr.send( params );

        if ( !runAsync ) {
            if ( xhr.status === 200 ) {
                if ( wayScript.onSuccess ) {
                    wayScript.onSuccess( xhr.responseText );
                }
            } else if ( onError ){
                wayScript.onError( xhr.statusText )
            }
        }
    };

    return wayScript;
});
