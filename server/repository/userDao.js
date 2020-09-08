import { getDb, getEntityKey } from './db';

const userDao = {
    createUser: async (username, password) => {
        const db = getDb();
        await db.collection('users').insertOne({ username, password });
    },
    getUser: async (username, password) => {
        const db = getDb();
        return await db.collection('users').findOne({ username, password });
    },
    getUserById: async (userId) => {
        const db = getDb();
        const userKey = getEntityKey(userId);
        return await db.collection('users').findOne(userKey);
    }
}


export default userDao;