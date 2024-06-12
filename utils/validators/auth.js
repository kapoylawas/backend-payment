// express validator
const { body } = require('express-validator');

// prisma
const prisma = require('../../prisma/client');

// devinisi validasi untuk register
const validateRegister = [
    body('name').notEmpty().withMessage('Name Harus Diisi'),
    body('email')
    .notEmpty().withMessage('Email Harus Diisi')
    .isEmail().withMessage('Email Tidak Terdaftar')
    .custom(async(value) => {
        if (!value) {
            throw new Error('Email Harus Diisi');
        }
        const user = await prisma.user.findUnique({ where: { email: value } });
        if (user) {
            throw new Error('Email Sudah Terdaftar')
        }
        return true;
    }),
    body('password').isLength({ min: 6 }).withMessage("Password Minimal Harus 6 Digit")
]

// Devini Untuk Login
const validateLogin = [
    body('email').notEmpty().withMessage('Input Email Terlebih Dahulu'),
    body('password').isLength({ min: 6 }).withMessage('Password Minimal 6 characters Atau Lebih'),
]

module.exports = { validateRegister, validateLogin }