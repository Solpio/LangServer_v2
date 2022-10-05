import express from 'express'
import UserModel from '../models/User'
import UserWords, { IWordStatus } from '../models/UserWords'
import { getWordsService } from '../services/word.service'

export const createUserWords = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const errorHandler = (num: number, mess: string) => {
      res.status(num).json({
        message: mess,
      })
    }

    const user = await UserModel.findById(req.body.id)
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }
    const words = await getWordsService(req.query, errorHandler)
    if (!words.length) {
      return res.status(404).json({
        message: 'Слова не найдены',
      })
    }
    let userWords = []
    for (let word of words) {
      const wordInBase = await UserWords.findOne({
        userId: user._id,
        wordId: word._id,
      })
      if (wordInBase) {
        userWords.push(wordInBase)
      } else {
        const userWord = new UserWords({
          wordId: word._id,
          userId: user._id,
          status: 'new',
        })
        userWords.push(userWord)
        await userWord.save()
      }
    }
    res.json({
      userWords,
    })
  } catch (err) {
    res.status(409).json({
      message: 'Солова уже были созданы',
    })
  }
}

export const getUserWords = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userWords = await UserWords.find({ user: req.body.id })
    if (!userWords) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }
    res.json({
      userWords,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка сервера',
    })
  }
}

export const setWordStatus = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (Object.keys(IWordStatus).indexOf(req.params.status) === -1) {
      return res.status(400).json({
        message: 'Неверный запрос',
      })
    }
    const userWord = await UserWords.findOneAndUpdate(
      { userId: req.body.id, wordId: req.params.id },
      { status: req.params.status },
      {
        new: true,
      }
    )

    if (!userWord) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }

    res.json({
      ...userWord._doc,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка сервера',
    })
  }
}

export const getWord = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body.id, req.params.id)
    const word = await UserWords.findOne({
      userId: req.body.id,
      wordId: req.params.id,
    })

    if (!word) {
      return res.status(404).json({
        message: 'Не нашло',
      })
    }

    res.json({ word })
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка сервера',
    })
  }
}
