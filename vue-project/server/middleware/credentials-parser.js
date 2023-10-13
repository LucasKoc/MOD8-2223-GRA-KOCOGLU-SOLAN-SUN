// Credentials parser route-level middleware that parses authorization header to decode and extract credentials
const credentialsParser = (req, res, next) => {
  try {
    req.credentials = {
      scheme: '',
      username: '',
      password: ''
    }

    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      return next() // Pass request to next request handler or middleware
    }

    // Authorization header value has the format: '[Scheme] [Credentials]'
    const [scheme, encodedCredentials] = authorizationHeader.split(' ')
    req.credentials.scheme = scheme

    if (scheme.toLowerCase() !== 'basic' || !encodedCredentials) {
      return next() // Pass request to next request handler or middleware
    }

    // Decoded basic credentials have the format: '[Username]:[Password]'
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf8')
    const components = decodedCredentials.split(':')

    req.credentials.username = components[0]

    components.splice(0, 1)
    req.credentials.password = components.join(':')

    next() // Pass request to next request handler or middleware
  } catch (err) {
    next(err) // Pass error to next error handler middleware
  }
}

export default credentialsParser
