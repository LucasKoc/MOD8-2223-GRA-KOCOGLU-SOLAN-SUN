import { randomUUID } from 'crypto'

export default (req, res, next) => {
  req.id = randomUUID()
  next()
}
