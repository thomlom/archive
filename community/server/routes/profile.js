import express from 'express';
import User from '../models/user';
import {
    setUserInfo
} from './auth';

const router = express.Router();

router.delete('/delete/:id', (req, res, next) => {
    User.remove({
        _id: req.params.id
    }, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

export default router;