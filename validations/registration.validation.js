"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 5 })
        .isAlphanumeric('en-US')
        .matches(/\d/)
        .matches(/[A-Z]/),
    (0, express_validator_1.body)('username').isLength({ max: 12, min: 5 }).isAlphanumeric('en-US'),
    (0, express_validator_1.body)('avatarUrl').optional().isURL(),
];
