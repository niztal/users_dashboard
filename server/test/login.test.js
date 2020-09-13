import request from 'supertest';
import app from '../server';
import 'babel-polyfill';
import 'regenerator-runtime/runtime';
const { MongoClient } = require('mongodb');

describe('login', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('should fail if missing username or password', async () => {
        const res = await request(app)
            .post('/login')
            .send();
        expect(res.statusCode).toEqual(403);
    })
})