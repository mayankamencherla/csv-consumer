const csv = require('csvtojson');
const ObjectModel = require('../../models/object.model');
const {getItem, mergeChanges, duplicatedEntity, validateCsvInput} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Takes in the file input and saves the data in the DB
     */
    app.post('/csv', async (req, res, next) => {
        if (!validateCsvInput(req)) {
            res.json({
                "Success": false,
                "message": "File needs to be updloaded via the file parameter in the request"
            });

            return;
        }

        const path = req.files.file.tempFilePath;

        console.log('Request to add objects to the DB');

        var count = 0;

        // Streaming to avoid loading entire csv in memory
        await csv({output: "line"}).fromFile(path).subscribe(async (row) => {

            columns = []

            for (var i in [0,1,2]){
                var ind = row.indexOf(',')
                var kept = row.substring(0, ind)
                var row = row.substring(ind+1)
                columns.push(kept)
            }
            columns.push(row)

            let object = new ObjectModel({
                object_id: parseInt(columns[0]),
                object_type: columns[1],
                timestamp: columns[2],
                changes: columns[3]
            })

            var current = await getItem(object.object_type, object.object_id, object.timestamp);

            object.changes = mergeChanges(current, columns[3]);

            // We don't want to save into the DB double entities
            if (duplicatedEntity(object.changes, current)) return;

            try {
                await object.save();
                count++;
                console.log(`Object ${object.id} saved successfully`);
            } catch (e) {
                console.log(`Object ${object.id} was not saved successfully`);
            }
        })

        res.json({"Success": true, "count": count});
    });
};
