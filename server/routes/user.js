import express from 'express';
import userDao from '../repository/userDao';

const router = express.Router();

const getUserById = (userId) => {
    const user = userDao.getUserById(userId);
    if (!user) {
        throw { status: 404, message: "User not found" }
    }
    return user;
}

const getUsers = () => {
    return userDao.getUsers({ isLoggedIn: true });
}

router.get('/', async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            getUsers().toArray((err, users) => {
                if (err) {
                    throw {message: err};
                }
                res.send(users).status(200);
            });
        } else {
            const user = getUserById(userId);
            res.send(user).status(200);
        }
    }
    catch (err) {
        next(err);
    }
});

export default router;