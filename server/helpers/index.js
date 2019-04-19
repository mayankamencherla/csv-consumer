const ObjectModel = require('../models/object.model');

async function getItems(type, id, ts) {
    return Promise.resolve(ObjectModel.find({
        $and: [
            {object_type: type},
            {object_id: id},
            {timestamp: { $lte: parseInt(ts) }}
        ]
    })
    .sort({ timestamp: -1 }));
}

async function getItem(type, id, ts) {
    const items = await getItems(type, id, ts);

    let item;
    if (items.length > 0) {
        item = items[0];
    }

    return item;
}

function mergeChanges(current, changes) {
    if (current === undefined) {
        return changes;
    }

    var current = JSON.parse(JSON.parse(current.changes));
    var changes = JSON.parse(JSON.parse(changes));

    console.log(current, changes);

    changes = Object.assign(current, changes);

    console.log(changes);

    return JSON.stringify(changes);
}

module.exports = {
    getItems,
    getItem,
    mergeChanges
};