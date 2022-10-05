import mongoose from 'mongoose'
import { DocumentResult } from './helpers'

export interface IWords extends DocumentResult<IWords> {
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

const WordsSchema = new mongoose.Schema<IWords>({
  group: { type: Number, required: true },
  word: { type: String, required: true, max: 100 },
  image: { type: String, required: false, max: 150 },
  audio: { type: String, required: false, max: 150 },
  audioMeaning: { type: String, required: false, max: 150 },
  audioExample: { type: String, required: false, max: 150 },
  textMeaning: { type: String, required: false, max: 300 },
  textExample: { type: String, required: false, max: 300 },
  transcription: { type: String, required: false, max: 100 },
  wordTranslate: String,
  textMeaningTranslate: String,
  textExampleTranslate: String,
})

export default mongoose.model('Words', WordsSchema)
