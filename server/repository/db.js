import { ok } from "assert";
import { MongoClient as client, ObjectID } from "mongodb";

let _db;

const initDb = (callback) => {
    const mongoUrl = process.env.DB_URL;
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    client.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return callback(err);
        }
        _db = client.db('usersDB');
        return callback(null, _db);
    });
}

const getDb = () => {
    ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

const getEntityKey = (entityId) => {
    return new ObjectID(entityId);
}

module.exports = {
    getDb,
    initDb,
    getEntityKey
};