# CSV Consumer

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- [![Packagist](https://img.shields.io/packagist/v/symfony/symfony.svg)]() -->

> This app is a backend over HTTP that consumes CSV's and allows users to retrieve CSV entity history based on timestamp.

## Pre-requisities:
> Some key things to set up / understand to use this app:

- **[NodeJS v9](https://nodejs.org/en/)**
- **[npm](https://www.npmjs.com/)**

## Downloading
```bash
$ git clone https://github.com/mayankamencherla/csv-consumer.git
```

## Setup Locally
> To get the app working locally, or to run test cases, follow the instructions below.
> After setting up the app, details on each API and how to use it can be found below in the **[API's available on this app](https://github.com/mayankamencherla/truelayer-interview-app#apis-available-on-this-app)** section.
> If any of the commands below are denied due to a permission error, please prepend a sudo to the command.

1. Navigate to the app's root directory

2. Run the following command to install all the dependencies:
```bash
$ npm install
```

3. Create a .env file in the root directory
```bash
$ touch .env
```

4. Change the values of the environment variables in .env: and ensure that the MONGODB_URI is set to your MONGODB DB URI.

5. Run the app on localhost by typing the following command:
```bash
$ npm start
```

6. Head over to <a href="http://localhost:3000" target="_blank">localhost:3000</a> on your browser to see Success = true

7. To use this app on heroku, please head over to <a href="https://protected-basin-69617.herokuapp.com" target="_blank">heroku</a>

## Environment variables
Environment variables are picked up from the .env file, which must be created in the app's root directory.

Some key environment variables are listed and explained below:

1. *MONGODB_URI*: The URI that points to your MongoDB installation

## API's available on this app
> This app supports 2 API's currently

1. POST <a href="https://protected-basin-69617.herokuapp.com/csv" target="_blank">/csv</a>
    - Allows your to upload your CSV via to be stored in the DB
    - The file needs to be uploaded via the *file* post parameter

2. GET <a href="https://protected-basin-69617.herokuapp.com/query" target="_blank">/query</a>
    - allows you to fetch the state of an entity that is saved in the DB at a particular timestamp
    - If there is no state for the entity at the time instant, null is returned
    - Required parameters are type, id and timestamp
    - Example: https://protected-basin-69617.herokuapp.com/query?type=Invoice&id=1&timestamp=1484733920
