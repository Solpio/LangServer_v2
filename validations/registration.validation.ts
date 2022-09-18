import { body } from 'express-validator'

export const registerValidation = [
  body('email').isEmail(),
  body('password')
    .isLength({ min: 5 })
    .isAlphanumeric('en-US')
    .matches(/\d/)
    .matches(/[A-Z]/),
  body('username').isLength({ max: 12, min: 5 }).isAlphanumeric('en-US'),
  body('avatarUrl').optional().isURL(),
]
