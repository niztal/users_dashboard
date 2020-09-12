import { getDb, getEntityKey } from './db';

const userDao = {
    createUser: async (username, password, registrationTime) => {
        const db = getDb();
        return await db.collection('users').insertOne({ username, password, registrationTime });
    },
    getUser: async (username, password) => {
        const db = getDb();
        return await db.collection('users').findOne({ username, password });
    },
    getUserById: async (userId) => {
        const db = getDb();
        const userKey = getEntityKey(userId);
        return await db.collection('users').findOne(userKey);
    },
    //TODO: move to async
    getUsers: (query) => {
        const db = getDb();
        return db.collection('users').find(query);
    },
    updateUser: async (userId, values) => {
        const db = getDb();
        const userKey = getEntityKey(userId);
        const newValues = { $set: values };
        return await db.collection('users').updateOne({ _id: userKey }, newValues);
    }
}


export default userDao;