import express from 'express';
import register from './register';
import login from './login';

const router = express.Router();

router.use('/register', register);
router.use('/login', login);

router.get('/', (req, res) => {
    //TODO: res.sendFile(__dirname + '/index.html')
    res.send({message: 'Hello World!!'});
});

export default router;