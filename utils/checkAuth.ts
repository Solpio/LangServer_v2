import jwt from 'jsonwebtoken'
import express from 'express'

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = (req.headers.authorization || ' ').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123')
      if (typeof decoded !== 'string') {
        req.body.id = decoded._id
      }
      next()
    } catch (err) {
      return res.status(403).json({
        massage: 'Нет доступа',
      })
    }
  } else {
    return res.status(403).json({
      massage: 'Нет доступа',
    })
  }
}
