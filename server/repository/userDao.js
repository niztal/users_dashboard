import { getDb } from './db';

const userDao = {
    createUser: async (username, password) => {
        const db = getDb();
        await db.collection('users').insertOne({ username, password });
    },
    getUser: async (username, password) => {
        const db = getDb();
        return await db.collection('users').findOne({ username, password });
    }
}


export default userDao;