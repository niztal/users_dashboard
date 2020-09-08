import express from 'express';
import userDao from '../repository/userDao';
import {createToken} from '../utils/token';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            const error = { status: 400, message: 'missing login information' }
            next(error);
        }
        const user = await userDao.getUser(username, password);
        if (!user) {
            throw { status: 401, message: "User unauthorized to log in" }
        } else {
            const token = createToken(user._id);
            res.send({ token }).status(200);
        }
    }
    catch (err) {
        next(err);
    }

});

export default router;