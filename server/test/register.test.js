import request from 'supertest';
import app from '../server';
const { MongoClient } = require('mongodb');

describe('register', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('should fail if missing username or password', async () => {
        const res = await request(app)
            .post('/register')
            .send();
        expect(res.statusCode).toEqual(400);
    }),
    it('should success if provided username or password', async () => {
        const res = await request(app)
            .post('/login')
            .send({username: "abc@gmail.com", password: "123"});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('userId');
    })
})