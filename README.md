# Arithmetic Operations UI
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

![Untitled_ Jul 23, 2023 12_03 AM.gif](..%2FUntitled_%20Jul%2023%2C%202023%2012_03%20AM.gif)

LIVE VERSION : https://stormy-reef-51242-892f30267fba.herokuapp.com/login

## Development server

### Pre-conditions
* `Node 18.16.1`
* `Npm 9.5.1`

1. `npm install` ( Installing all dependencies )
2. `npm run start-dev` ( Starting localhost )

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Access Login

Test User : `jocarosa`
Password: `12345`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Notes

This Angular application is configured to proxy API requests directly to a Spring Boot backend hosted on an Amazon EC2 instance,
it can be found in the following GitHub repository: https://github.com/joanrosariodelarosa/aritmetic-operations-api.

During development, if the backend runs locally and is accessible via http://localhost:8080, 
the Angular app's proxy can be set up to forward requests to the local backend,  configuring the proxy.conf.json located in the Angular application's root directory.
facilitating simultaneous frontend and backend development.
