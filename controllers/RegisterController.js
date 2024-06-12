//import express
const express = require("express");

// Import validationResult from express-validator
const { validationResult } = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");

//import prisma client
const prisma = require("../prisma/client");

const register = async(req, res) => {

    // check hasil validasi
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        // jika ada error, kembalikan kepada user
        return res.status(422).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        // insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        //return response json
        res.status(201).send({
            success: true,
            message: "register success",
            data: user,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { register };