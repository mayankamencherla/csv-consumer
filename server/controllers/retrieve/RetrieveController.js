const {getItem} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Retrieves an entity based on input parameters
     */
    app.get('/query', async (req, res, next) => {
        // TODO: Validate that the req params contains type, id and timestamp
        console.log(`Request to retrieve ${req.query.type} ${req.query.id} at ${req.query.timestamp}`);

        var result = await getItem(req.query.type, req.query.id, req.query.timestamp);

        let changes = "null";
        if (result !== undefined) {
            changes = result.changes;
        }

        res.json({"Success": changes !== "null", "result": JSON.parse(JSON.parse(changes))});
    });
};
