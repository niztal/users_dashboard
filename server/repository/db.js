import { ok } from "assert";
import { MongoClient as client } from "mongodb";

//TODO: change to env variable
const mongoUrl = 'mongodb://localhost:27017';

let _db;

const initDb = (callback) => {
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

module.exports = {
    getDb,
    initDb
};