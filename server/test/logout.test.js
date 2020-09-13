import request from 'supertest';
import app from '../server';
import {createToken} from '../utils/token';

const { MongoClient } = require('mongodb');

describe('logout', () => {
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

    it('should fail if missing userId', async () => {
        const token = createToken("someUserId");
        const res = await request(app)
            .post('/logout')
            .set('Authorization', 'Bearer ' + token)
            .send();
        expect(res.statusCode).toEqual(400);
    }),
        it('should success if provided userId', async () => {
            const userId = '5f5c6eafcb4775513034099a';
            const token = createToken(userId);
            const res = await request(app)
                .post('/logout')
                .set('Authorization', 'Bearer ' + token)
                .send({ userId });
            expect(res.statusCode).toEqual(200);
        })
})