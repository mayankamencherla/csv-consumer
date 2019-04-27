
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

describe('Test retrieve route', () => {

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

    it('should not retrieve invalid query', async () => {
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

        const results = await request(app).get('/query?timestamp=123123123&id=23123&type=asdasd').send();
        expect(results.statusCode).toEqual(200);
        expect(results.body.Success).toEqual(true);
        expect(results.body.result).toEqual(null);

        rimraf.sync(__dirname + '/tmp');
    });
});
