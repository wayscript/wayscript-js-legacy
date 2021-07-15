# [<img src="https://user-images.githubusercontent.com/31461850/53454621-a1b39500-39dc-11e9-9b3c-276451d42437.png" width="155px" alt="WayScript" align="center">](https://wayscript.com) JS

[![npm version](https://img.shields.io/npm/v/wayscript.svg?color=blue)](https://www.npmjs.com/package/wayscript-legacy/) [![CircleCI Status](https://circleci.com/gh/wayscript/wayscript-js-legacy/tree/master.svg?style=shield)](https://circleci.com/gh/wayscript/wayscript-js-legacy/tree/master)

### A rapid scripting platform for developers.

WayScript allows you to run Python in the cloud, and seamlessly integrate with your favorite APIs.

![Trigger scripts on any event or schedule.](https://user-images.githubusercontent.com/31461850/68791693-af5a8a80-05fe-11ea-86dd-32ccc9641bbe.png)

## Quick Start

If you use npm:

```sh
npm install wayscript
```

Or load directly from CDN:

```html
<script src="https://cdn.wayscript.com/static/js/api/wayscript-legacy.0.1.2.js"></script>
```

## Basic Usage

1. Add one or more [HTTP Triggers](https://docs.wayscript.com/library/triggers/http-trigger) to your script.

2. If you have a [password-protected endpoint](https://docs.wayscript.com/library/triggers/http-trigger#password-protect-your-endpoints), obtain your API key or the credentials you would like to use.

3. If you have specified a [custom endpoint](https://docs.wayscript.com/library/triggers/http-trigger#endpoints), you will need to pass the name of that endpoint in your api call.

4. If your HTTP Trigger takes [query parameters](https://docs.wayscript.com/library/triggers/http-trigger#request-query-parameters) and/or [JSON body parameters](https://docs.wayscript.com/library/triggers/http-trigger#request-json-body-parameters), you can pass those as a dictionary using the `params` and/or `data` arguments, respectively. (See [HTTP Trigger Outputs](https://docs.wayscript.com/library/triggers/http-trigger#outputs) for more information.)

5. Run your WayScript programs from your JavaScript code:

```javascript
wayscript = require('wayscript-legacy')

// If your program requires a password to run, supply those credentials when creating the client
wayscript.username = 'Username';
wayscript.password = 'Pa$$word';

// If your program requires a password to run, you can instead supply your API Key when creating the client
wayscript.apiKey = 'YOUR_API_KEY';

// Run a program by id
let programId = 1234;
wayscript.run( programId );

// Pass query parameters to a program (optional)
let query_params = { 'var1': 'one', 'var2': 'two', 'var3': 'three' };
wayscript.run( programId, params = query_params );

// Run a specific endpoint within your script (optional)
let endpoint = 'MyEndpoint';
wayscript.run( programId, endpoint, params = query_params );

// Pass data within the body of your request (optional)
let body_params = { 'var4': 'four', 'var5': 'five', 'bar6': 'six' };
wayscript.run( programId, endpoint, params = query_params, data = body_params );

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
