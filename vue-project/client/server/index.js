import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Get environment defined by cross-env in package.json
const environment = process.env.NODE_ENV
if (!environment) {
    throw new Error('Environment is not defined.')
}

// Create Express application object
const app = express()

// Morgan request logger middleware
app.use(logger(environment === 'development' ? 'dev' : 'common'))

// Helmet security middleware, configured with Content-Security-Policy response header
// in order to enable client-side scripts to call API at origin specified in .env
app.use(helmet({ contentSecurityPolicy: { directives: { 'default-src': ["'self'", process.env.API_ORIGIN] } } }))

// Compression middleware for compressing response bodies
app.use(compression())

// Express static file middleware that serves files from Vue single-page application build path
const clientBuildPath = join(dirname(fileURLToPath(import.meta.url)), '../client/dist')
app.use(express.static(clientBuildPath))

// GET request handler for all other URLs that returns index.html of Vue single-page application
const indexPath = join(clientBuildPath, 'index.html')
app.get('*', (req, res) => res.sendFile(indexPath))

// Error handler middleware
app.use((err, req, res, next) => {
    const status = err.status ?? 500 // Get error status or use default status 500
    const isServerError = status >= 500

    console.error(isServerError ? err : `${status}: ${err.message}`) // Log error in server console
    const message = isServerError ? 'Something went wrong.' : err.message // Create client-friendly message

    res.status(status).send(message) // Send client-friendly error message
})

// Start listening for client requests
const port = process.env.PORT
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`))
