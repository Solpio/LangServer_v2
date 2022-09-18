import express from "express";
import Words from "../models/Words";

export const getBooks = async (req: express.Request,res: express.Response) => {
  try {
    let groupIndex = 0;
    const groupMas = []
    while (true){
      const total = await Words.count({group: groupIndex})
      if (!total){
        break
      }
      groupMas.push({group: groupIndex, total: total})
      groupIndex += 1
    }

    res.json({
      groupMas
    })

  } catch (err){
    res.status(500).json({
      message: 'Ошибка сервера',
    })
  }

}