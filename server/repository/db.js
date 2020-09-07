import {MongoClient as client} from 'mongodb';

let _db;

//TODO: get mongoUrl from env variable

const initDb = () => {
    client.connect(mongoUrl, (err, client) => {
        if (err) {
            throw {code: 500, message: 'network error'};
        }
        _db = client.db('users');
    });
}

const getDb = () => {
    if (_db) {
        initDb();
    }
    return _db;
}

module.exports = getDb;
