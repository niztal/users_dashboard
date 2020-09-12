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
        userDao.createUser(username, password, Date.now()).then((response) => {
            const user = response.ops[0];
            const token = createToken(user._id);
            res.status(201).send({ token });
        });
    }
});

export default router;