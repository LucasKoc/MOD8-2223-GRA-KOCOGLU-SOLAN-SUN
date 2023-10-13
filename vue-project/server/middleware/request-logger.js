import morgan from 'morgan'
import painter from '../utility/log-painter.js'

morgan.token('id', (req) => req.id)

function developmentLogger(tokens, req, res) {
  const status = tokens.status(req, res)

  return [
    painter.colorRequest(tokens.id(req, res)),
    tokens.method(req, res),
    tokens.url(req, res),
    painter.colorStatus(status),
    tokens['response-time'](req, res),
    'ms',
    '-',
    tokens.res(req, res, 'content-length')
  ].join(' ')
}

export default (environment) => {
  if (environment === 'development') {
    return morgan(developmentLogger)
  }

  const productionFormat =
    ':id :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length]'
  return morgan(productionFormat)
}
