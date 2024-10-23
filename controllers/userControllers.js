import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

import db from '../models/index.js';

const User = db.users;

const userControllers = {
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    register: async (req, res) => {
        const { email, password, rePassword } = req.body;
        //check if email exists
        const emailExists = await User.findOne({ where: { email: email } });

        if (emailExists) {
            return res.status(400).render('404', {
                title: 'Email already exists',
                message: 'Email already exists. Please login'
            });
        }
        //validate email, password, check if passwords match
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = matchPasswords(password, rePassword);

        if (isEmailValid && isPasswordValid && doPasswordsMatch) {
            //hash password
            const hashedPassword = hashPassword(password);

            //create user
            await User.create({
                email: email,
                password: hashedPassword
            });
            res.status(302).redirect('/api/login');
        } else {
            res.status(400).render('404', {
                title: 'Email or password incorrect',
                message: 'Email or password incorrect'
            });
        }
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const emailExists = await User.findOne({ where: { email: email } });

        if (emailExists) {
            //check if the password is correct
            bcrypt.compare(password, emailExists.password, (err, isValid) => {
                if (err) {
                    return console.error(err);
                }
                if (isValid) {
                    //create token
                    const token = jwt.sign(
                        { email: emailExists.email },
                        process.env.TOKEN_SECRET
                    );
                    //add to cookies
                    res.cookie('id', emailExists.id, { httpOnly: true });
                    res.cookie('token', token, { httpOnly: true });

                    res.status(302).redirect('/api/recipes');
                }
            });
        } else {
            res.status(400).render('404', {
                title: 'Your email does not exit. Please register',
                message: 'Your email does not exit. Please register'
            });
        }
    },
    logout: (req, res) => {
        res.clearCookie('id');
        res.clearCookie('token');

        res.status(302).redirect('/api/recipes');
    }
};

export default userControllers;
