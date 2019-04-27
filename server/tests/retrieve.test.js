
require('dotenv').config();

const expect                 = require('expect');
const request                = require('supertest');
const Chance                 = require('chance');
const fs                     = require('fs');
const util                   = require('util');
const rimraf                 = require('rimraf');
require('util.promisify').shim();

const {app}                  = require('./../server');
const ObjectModel            = require('../models/object.model');

const writeFile = util.promisify(fs.writeFile);
const chance = new Chance();

describe('Test upload route', () => {

    it('should assert that timestamp not in the query param', (done) => {

        //
        // Timestamp not sent in the query param
        //
        request(app)
            .get('/query?type=asdasd&id=asdasd')
            .expect(200)
            .end((err, res) => {
                const results = res.body;
                expect(results.Success).toEqual(false);
                expect(results.message).toEqual("type, id and timestamp need to be passed in the query params");
                done();
            });
    });

    it('should assert that type not in the query param', (done) => {

        //
        // Type not sent in the query param
        //
        request(app)
            .get('/query?timestamp=asdasd&id=asdasd')
            .expect(200)
            .end((err, res) => {
                const results = res.body;
                expect(results.Success).toEqual(false);
                expect(results.message).toEqual("type, id and timestamp need to be passed in the query params");
                done();
            });
    });

    it('should assert that id not in the query param', (done) => {

        //
        // Id not sent in the query param
        //
        request(app)
            .get('/query?timestamp=asdasd&id=asdasd')
            .expect(200)
            .end((err, res) => {
                const results = res.body;
                expect(results.Success).toEqual(false);
                expect(results.message).toEqual("type, id and timestamp need to be passed in the query params");
                done();
            });
    });
});
