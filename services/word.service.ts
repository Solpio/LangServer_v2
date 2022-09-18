import WordsModel from '../models/Words'

type Handler = (num: number, mes: string) => any //fix type
interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[]
}

export const getWordsService = async (
  params: ParsedQs,
  errorHandler: Handler
) => {
  const { offset, group, limit } = params
  const words = await WordsModel.find({
    group,
  })
    .limit(Number(limit))
    .skip(Number(offset))

  if (!words) {
    return errorHandler(404, 'Слова не найдено')
  }

  return words
}
