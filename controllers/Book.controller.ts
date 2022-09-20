import express from 'express'
import Words from '../models/Words'

export const getBooks = async (req: express.Request, res: express.Response) => {
  try {
    let groupIndex = 0
    let total = 1
    const groupMas = []
    while (total > 0) {
      total = await Words.count({ group: groupIndex })
      if (total) {
        groupMas.push({ group: groupIndex, total: total })
        groupIndex += 1
      }
    }

    res.json({
      groupMas,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка сервера',
    })
  }
}
