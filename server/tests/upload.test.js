
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

    it('should save all data into the DB', async () => {
        var data = 'object_id,object_type,timestamp,object_changes';
        for (var i=0; i<10; i++) {
            data += "\n";
            const type = `object_type_${new Date().getTime()}`;
            const ts = new Date().getTime();
            const changes = {
                key1: chance.string(),
                key2: chance.string(),
            }
            data += `${i},${type},${ts},${JSON.stringify(changes)}`;
        }

        if (!fs.existsSync(__dirname + '/tmp')) {
            fs.mkdirSync(__dirname + '/tmp');
        }

        const path = __dirname + `/tmp/file_${new Date().getTime()}`;

        try {
            await writeFile(path, data);
        } catch (e) {
            console.log('Unable to write file');
            return Promise.reject();
        }

        request(app)
            .post('/csv')
            .attach('file', path)
            .expect(200)
            .end((err, res) => {
                const results = res.body;
                expect(results.Success).toEqual(true);
                expect(results.count).toEqual(10);
                done();
            });

        rimraf.sync(__dirname + '/tmp');
    })
});
