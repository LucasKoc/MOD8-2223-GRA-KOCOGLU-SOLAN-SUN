import painter from '../utility/log-painter.js'

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  const id = req.id
  const status = err.status ?? 500 // Get error status or use default status 500
  const isServerError = status >= 500

  err.id = id // Set error id to request id to facilitate debugging and support
  console.error(isServerError ? err : getClientErrorMessage(id, status, err.message)) // Log error in server console
  const message = isServerError ? 'Something went wrong.' : err.message // Create client-friendly message

  res.status(status).json({ error: { id, message } }) // Send client-friendly error message
}

function getClientErrorMessage(id, status, message) {
  const environment = process.env.NODE_ENV
  if (environment === 'development') {
    return `${painter.colorRequest(id)} ${painter.colorByStatus(`${status} ${message}`, status)}`
  } else {
    return `${id} ${status} ${message}`
  }
}

export default errorHandler
