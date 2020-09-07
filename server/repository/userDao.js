import getDb from './db';

const userDao = {
    createUser: async (email, password) => {
        const db = getDb();
        await db.collection('users').insertOne({ email, password });
    }
}


export default userDao;