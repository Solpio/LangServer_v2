import { validationResult } from 'express-validator'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User'

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const salt = await bcrypt.genSalt(10)
    const pwrdHash = await bcrypt.hash(req.body.password, salt)

    const doc = new UserModel({
      email: req.body.email,
      username: req.body.username,
      passwordHash: pwrdHash,
      avatarUrl: req.body.avatarUrl,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user.id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    )
    const { passwordHash, ...UserData } = user._doc
    res.json({
      ...UserData,
      token,
    })
  } catch (err) {
    res.status(500).json({
      massage: 'не удалось зарагистрироваться',
    })
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const isEmail = req.body.login.match(/@/)
    let user
    if (isEmail) {
      user = await UserModel.findOne({ email: req.body.login })
    } else {
      user = await UserModel.findOne({ username: req.body.login })
    }

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }
    const isValid = await bcrypt.compare(req.body.password, user.passwordHash)
    if (!isValid) {
      return res.status(401).json({
        message: 'Неправильный логин или пароль',
      })
    }

    const token = jwt.sign(
      {
        _id: user.id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    )

    const { passwordHash, ...UserData } = user._doc
    res.json({
      ...UserData,
      token,
    })
  } catch (err) {
    res.status(400).json({
      message: 'не удалось войти',
    })
  }
}

export const getMe = async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModel.findById(req.body.id)
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Нет доступа',
    })
  }
}
