import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { registerValidation } from './validations/registration.validation'
import * as UserController from './controllers/User.controller'
import * as WordsController from './controllers/Words.controller'
import * as UserWordsController from './controllers/UserWords.controller'
import * as BookController from './controllers/Book.controller'
import checkAuth from './utils/checkAuth'

const { MONGODB_URI, PORT } = process.env

const app = express()
const port = PORT || 4444

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('db ok')
  })
  .catch((reason) => {
    console.log(reason)
  })

app.use(express.json())
app.use(cors())
app.use('/files', express.static('files'))

app.post('/auth/registration', registerValidation, UserController.createUser)
app.post('/auth/login', UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/words', WordsController.getWords)

app.get('/books/sections', BookController.getBooks)

app.post('/user/words', checkAuth, UserWordsController.createUserWords)
app.get('/user/words', checkAuth, UserWordsController.getUserWords)
app.get('/user/words/:id', checkAuth, UserWordsController.getWord)
app.put('/user/words/:id/:status', checkAuth, UserWordsController.setWordStatus)

app.listen(port, () => {
  console.log('Server OK')
})
