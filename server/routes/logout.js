import express from 'express';
import userDao from '../repository/userDao';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            const error = { status: 400, message: 'missing information' }
            next(error);
        }
        if (req.userId !== userId) {
            const error = {status: 403, message: 'wrong user id'}
            next(error);
        }
        const user = await userDao.getUserById(userId);
        if (!user) {
            throw { status: 404, message: "User not found" }
        } else {
            userDao.updateUser(user._id,
                {
                    isLoggedIn: false
                });
            res.status(200).send();
        }
    }
    catch (err) {
        next(err);
    }
});

export default router;