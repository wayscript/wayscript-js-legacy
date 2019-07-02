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
<script src="https://cdn.wayscript.com/static/js/api/wayscript.0.0.7.js"></script>
```

## Basic Usage

1. Get the API Key from your WayScript user profile page

2. Run WayScript programs from your JavaScript code:

```javascript
wayscript.apiKey = 'YOUR_API_KEY';

// Run a program by id
let programId = 1234;
wayscript.runProgram( programId );

// Pass variables to a program (optional)
let variables = [ 'one', 'two', 'three' ];
wayscript.runProgram( programId, variables );

// Run a specific function within your program (optional)
let functionName = 'My Function';
wayscript.runProgram( programId, variables, functionName );

// Handle the response
let onSuccess = function( responseText ) {
  console.log( responseText );
};
let onError = function( responseText ) {
  console.log( responseText );
};
wayscript.runProgram( programId ).onSuccess( onSuccess ).onError( onError );
```

⭐ In order to run a program using the WayScript Python API, you must first add an active [Webhook Trigger](https://wayscript.com/documentation/trigger/webhook_trigger) to that program.

### Running a specific function

- The function you specify MUST have an active [Webhook Trigger](https://wayscript.com/documentation/trigger/webhook_trigger).
- If you do not specify a function name in your request and your program has ***one*** function with a Webhook Trigger, the function with the Webhook Trigger will run.
- If you do not specify a function name in your request and your program has ***multiple*** functions with Webhook Triggers, you will be asked to specify which function you would like to run.

## Example Apps

- Node.js

    - [Run a Python script from your node app](https://github.com/wayscript/node-to-python-example)

    - [Send an email using Gmail from your node app](https://github.com/wayscript/node-to-gmail-example)
    
- JavaScript

    - [Send a Gmail message using JavaScript+WayScript](https://github.com/wayscript/js-to-gmail-example)
