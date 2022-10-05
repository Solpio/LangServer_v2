import express from 'express'
import { getWordsService } from '../services/word.service'
import Words from '../models/Words'

export const getWords = async (req: express.Request, res: express.Response) => {
  try {
    const errorHandler = (num: number, mess: string) => {
      res.status(num).json({
        message: mess,
      })
    }
    const words = await getWordsService(req.query, errorHandler)
    if (!words.length) {
      return res.status(404).json({
        message: 'Не удалось найти слова из раздела или страницы',
      })
    }
    res.json({
      words: [...words],
      total: await Words.count({ group: req.query.group }),
    })
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка сервера',
    })
  }
}
