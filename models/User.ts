import mongoose from 'mongoose'
import { DocumentResult } from './helpers'

interface IUser extends DocumentResult<IUser> {
  username: string
  email: string
  passwordHash: string
  avatarUrl?: string
}
const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
