// express validator
const { body } = require('express-validator');

// prisma
const prisma = require('../../prisma/client');

// devinisi validasi untuk create user
const validateUser = [
    body('name').notEmpty().withMessage('Name Harus Diisi'),
    body('email')
    .notEmpty().withMessage('Email Harus Diisi')
    .isEmail().withMessage('Email Tidak Terdaftar')
    .custom(async(value) => {
        if (!value) {
            throw new Error('Email Harus Diisi');
        }
        const user = await prisma.user.findUnique({ where: { email: value } });
        if (user && user.id !== Number(req.params.id)) {
            throw new Error('Email Sudah Terdaftar')
        }
        return true;
    }),
    body('password').isLength({ min: 6 }).withMessage("Password Minimal Harus 6 Digit")
]

module.exports = { validateUser }