import express from 'express';
import userDao from '../repository/userDao';
import { createToken } from '../utils/token';

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
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            ip = ip === "::1" ? "127.0.0.1" : ip;
            const userAgent = req.get('User-Agent');
            const loginsCount = user.loginsCount + 1 || 1;
            userDao.updateUser(user._id,
                {
                    isLoggedIn: true, loginTime: Date.now(), ip, userAgent, loginsCount
                });
            const token = createToken(user._id);
            res.setHeader("X-REFRESH", process.env.REFRESH);
            res.send({ userId: user._id, token }).status(200);
        }
    }
    catch (err) {
        next(err);
    }

});

export default router;