# [<img src="https://user-images.githubusercontent.com/31461850/53454621-a1b39500-39dc-11e9-9b3c-276451d42437.png" width="155px" alt="WayScript" align="center">](https://wayscript.com) JS

[![npm version](https://img.shields.io/npm/v/wayscript.svg?color=blue)](https://www.npmjs.com/package/wayscript/) [![CircleCI Status](https://circleci.com/gh/wayscript/wayscript-js/tree/master.svg?style=shield)](https://circleci.com/gh/wayscript/wayscript-js/tree/master)

### A new way to build software.

* WayScript gives you flexible building blocks to seamlessly integrate, automate and host tools in the cloud. Unlock new potential with drag and drop programming.

* Instantly connect to hundreds of datasets including GitHub, Twitter, databases, ecommerce data, or build your own integration. WayScript can read data from Excel, Google Sheets, and an evergrowing list of third-party APIs.

* Seamlessly migrate to the cloud: Generate interfaces, instantly share, and run via event-based triggering. 

## Quick Start

If you use npm:

```sh
npm install wayscript
```

Or load directly from CDN:

```html
<script src="https://cdn.wayscript.com/static/js/api/wayscript.0.1.0.js"></script>
```

## Basic Usage

1. Add one or more [HTTP Triggers](https://docs.wayscript.com/library/triggers/http-trigger) to your script.

2. If you have a [password-protected endpoint](https://docs.wayscript.com/library/triggers/http-trigger#password-protect-your-endpoints), obtain your API key or the credentials you would like to use.

3. If you have specified a [custom endpoint](https://docs.wayscript.com/library/triggers/http-trigger#endpoints), you will need the name of that endpoint as well.

4. If your HTTP Trigger takes query parameters and/or JSON Body Parameters, you can pass those as a dictionary of query_params and/or body_params to your program.

5. Run your WayScript programs from your JavaScript code:

```javascript
// Run using your api key
wayscript.apiKey = 'YOUR_API_KEY';

// Or with a custom username and password
wayscript.username = 'Username';
wayscript.password = 'Pa$$word';

// Run a program by id
let programId = 1234;
wayscript.run( programId );

// Pass query parameters to a program (optional)
let query_params = { 'var1': 'one', 'var2': 'two', 'var3': 'three' };
wayscript.run( programId, query_params = query_params );

// Run a specific endpoint within your script (optional)
let endpoint = 'MyEndpoint';
wayscript.run( programId, endpoint, query_params = query_params );

// Pass data within the body of your request (optional)
let body_params = { 'var4': 'four', 'var5': 'five', 'bar6': 'six' };
wayscript.run( programId, endpoint, query_params, body_params = body_params );

// Handle the response
let onSuccess = function( responseText ) {
  console.log( responseText );
};
let onError = function( responseText ) {
  console.log( responseText );
};
wayscript.run( programId ).onSuccess( onSuccess ).onError( onError );
```

## Example Apps

- Node.js

    - [Run a Python script from your node app](https://github.com/wayscript/node-to-python-example)

    - [Send an email using Gmail from your node app](https://github.com/wayscript/node-to-gmail-example)
    
- JavaScript

    - [Send a Gmail message using JavaScript+WayScript](https://github.com/wayscript/js-to-gmail-example)
