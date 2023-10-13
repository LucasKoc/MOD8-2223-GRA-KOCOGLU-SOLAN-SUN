// Request authenticator route-level middleware
export default async (req, res, next) => {
  try {
    if (req.session) {
      // Authentication succeeded, because session id in request cookie matched a valid non-expired session in database,
      // proving that the client sending this request recently logged in via the /api/v1/auth/login endpoint
      return next() // Pass request to next request handler or middleware (request authorizer middleware or request handler for the current route)
    }

    res.appendHeader('WWW-Authenticate', 'Basic') // Add response header to inform client of correct authentication scheme
    const err = new Error('Request unauthenticated.')
    err.status = 401 // Set status to 401 Unauthorized (actually means unauthenticated)
    return next(err) // Pass error to next error handler middleware
  } catch (err) {
    next(err)
  }
}
