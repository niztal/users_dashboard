import express from 'express';
import userDao from '../repository/userDao';

const router = express.Router();

router.post('/', async (req, res) => {
    const {email, password} = req.body;
    //TODO: add input validation
    
    userDao.createUser(email, password);
    res.status(200).send();
});

export default router;