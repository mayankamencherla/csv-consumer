
require('dotenv').config();

const expect                 = require('expect');
const request                = require('supertest');

const {app}                  = require('./../server');
const ObjectModel            = require('../models/object.model');

describe('Test upload route', () => {

    it('should assert that input validation fails', (done) => {

        //
        // File is not set in the input
        //
        request(app)
            .post('/csv')
            .expect(200)
            .end((err, res) => {
                const results = res.body;
                expect(results.Success).toEqual(false);
                expect(results.message).toEqual("File needs to be updloaded via the file parameter in the request");
                done();
            });
    });

    it('should assert that file not set in the input', (done) => {
        //
        // File is not set as the correct variable in the input
        //
        request(app)
            .post('/csv')
            .attach('image', __dirname + '/../../csv_sample.csv')
            .expect(200)
            .end((err, res) => {
                const results = res.body;
                expect(results.Success).toEqual(false);
                expect(results.message).toEqual("File needs to be updloaded via the file parameter in the request");
                done();
            });
    })
});