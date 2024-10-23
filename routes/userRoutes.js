import express from 'express';
import userControllers from '../controllers/userControllers.js';

const router = express.Router();

const { getRegisterForm, register, getLoginForm, login, logout } =
    userControllers;

// routes
router.get('/register', getRegisterForm);
router.post('/register', register);
router.get('/login', getLoginForm);
router.post('/login', login);
router.get('/logout', logout);

export default router;
