import express from 'express';
import userDao from '../repository/userDao';
import { createToken } from '../utils/token';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const error = { status: 400, message: 'missing registration information' }
        next(error);
    } else {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip === "::1" ? "127.0.0.1" : ip;
        const userAgent = req.get('User-Agent');
        userDao.createUser({
            username,
            password,
            registrationTime: Date.now(),
            ip,
            userAgent,
            isLoggedIn: true,
            loginsCount: 1
        })
            .then((response) => {
                const user = response.ops[0];
                const token = createToken(user._id);
                res.setHeader("X-REFRESH", process.env.REFRESH);
                res.status(201).send({ userId: user._id, token });
            });
    }
});

export default router;