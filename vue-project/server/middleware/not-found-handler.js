// Resource not found middleware
const notFoundHandler = (req, res, next) => {
  const err = createNotFoundError()
  next(err) // Pass error to next error handler middleware
}

export function createNotFoundError() {
  const err = new Error('Not found.')
  err.status = 404 // Set error status to 404
  return err
}

export default notFoundHandler
