import mongoose from 'mongoose'

interface IUserWords {
  userId: mongoose.Schema.Types.ObjectId
  wordId: mongoose.Schema.Types.ObjectId
  status: keyof typeof IWordStatus
}

export enum IWordStatus {
  'new' = 'new',
  'learned' = 'learned',
  'favorite' = 'favorite',
  'forgotten' = 'forgotten'
}

const UserWordsSchema = new mongoose.Schema<IUserWords>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Words',
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('UserWords', UserWordsSchema)
