## Google API Keys

Please use your own API Key in the application, otherwise it will not work.
- google map API key -> src/index.html
- Other Google API -> src/environments/... -> key property

## Proxy server

Run `npm run proxy` for a proxy server for Google's distance and places API. Without this you can only use the mock services in the application.

## Development server with mock services

Run `npm run start:mock` for a dev server with mock services.

## Development server

IMPORTANT ! 
For this approach you should set the Google API key and run the proxy server.

Run `ng serve` or `npm run start` for a dev server. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).