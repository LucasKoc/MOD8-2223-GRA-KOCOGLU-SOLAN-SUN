import requestIdentifier from './request-identifier.js'
import requestLogger from './request-logger.js'
import sessionHandler from './session-handler.js'
import credentialsParser from './credentials-parser.js'
import requestAuthenticator from './request-authenticator.js'
import requestAuthorizer from './request-authorizer.js'
import notFoundHandler from './not-found-handler.js'
import errorHandler from './error-handler.js'

export default {
  requestIdentifier,
  requestLogger,
  sessionHandler,
  credentialsParser,
  requestAuthenticator,
  requestAuthorizer,
  notFoundHandler,
  errorHandler
}
