import express from 'express';
import userDao from '../repository/userDao';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = { status: 400, message: 'missing registration information' }
        next(error);
    } else {
        await userDao.createUser(email, password);
        res.status(201).send();
    }
});

export default router;