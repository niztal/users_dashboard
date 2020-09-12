import express from 'express';
import register from './register';
import login from './login';
import logout from './logout';
import user from './user';

const router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/user', user);

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/');
});

export default router;