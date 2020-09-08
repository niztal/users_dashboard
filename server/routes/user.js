import express from 'express';
import userDao from '../repository/userDao';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        console.log(req.query);
        const { userId } = req.query;
        if (!userId) {
            const error = { status: 400, message: 'missing information' }
            next(error);
        } else {
            const user = await userDao.getUserById(userId);
            if (!user) {
                throw { status: 404, message: "User not found" }
            } else {
                res.send(user).status(200);
            }
        }
    }
    catch (err) {
        next(err);
    }
});

export default router;