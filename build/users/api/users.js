import express from 'express';
import { create, get } from '../controller/user_controller.js';
const router = express.Router();
// create users
router.post('/signup', (req, res, next) => {
    create(req, res, next);
});
router.post('/signin', (req, res, next) => {
    get(req, res, next);
});
export default router;
