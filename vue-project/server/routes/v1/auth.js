import express from 'express'
import credentialsParser from '../../middleware/credentials-parser.js'

const router = express.Router()

router.post('/auth/signup', credentialsParser, async (req, res, next) => {
  try {
    // The immediately preceding credentials parser middleware validated and parsed the authorization header
    // to decode and extract the base-64 encoded username and password, and attached them to the request.
    // As a result, this request handler can get and immediately remove the credentials from the request.
    const credentials = req.credentials
    delete req.credentials

    // TODO: Invalidate session: Delete client-side cookie named 'session-id' and delete session in database
    // TODO: Validate request credentials and other sign up parameters to ensure they are present and have the correct format
    // TODO: If validation fails, exit early with a 400 Bad Request error
    // TODO: Otherwise, continue by using Bcrypt to hash the password (with a random salt generated with at least 10 rounds)
    // TODO: Create a user in the database using the username, hashed password, and other parameters
    // TODO: Important: Ensure that you do not store the plain-text password in the database
    // TODO: Send the username back to the client with a 201 Created response

    // TODO: Remove after implementing route:
    res.status(404).json({ error: { message: 'Route not implemented.' } })
  } catch (err) {
    next(err)
  }
})

router.post('/auth/login', credentialsParser, async (req, res, next) => {
  try {
    // The immediately preceding credentials parser middleware validated and parsed the authorization header
    // to extract the scheme and the base-64 encoded username and password, and attached them to the request.
    // As a result, this request handler can get and immediately remove the credentials from the request.
    const requestCredentials = req.credentials
    delete req.credentials

    // TODO: Invalidate session: Delete client-side cookie named 'session-id' and delete session in database
    // TODO: Validate request credentials to ensure they are present and have the correct format
    // TODO: If validation fails, exit early with a 401 Unauthorized error (actually means unauthenticated)
    // TODO: Otherwise, continue by finding user credentials in database
    // TODO: Use Bcrypt to compare request password with hashed password from database
    // TODO: If authentication failed, exit early with a 401 Unauthorized error (actually means unauthenticated)
    // TODO: Otherwise, continue by creating a session in the database
    // TODO: Use required cookie options: HttpOnly, Secure, and SameSite=Lax
    // TODO: Exclude cookie options MaxAge and Expires to create a transient session cookie
    // TODO: Send session id to be stored by browser and sent with future requests, by setting 'session-id' cookie with the required options
    // TODO: Send the authenticated user (excluding password) back to the client in a 200 response

    // TODO: Remove after implementing route:
    res.status(404).json({ error: { message: 'Route not implemented.' } })
  } catch (err) {
    next(err)
  }
})

router.post('/auth/logout', async (req, res, next) => {
  try {
    // TODO: Invalidate session: Delete client-side cookie named 'session-id' and delete session in database
    // TODO: Send a 200 response back to client

    // TODO: Remove after implementing route:
    res.status(404).json({ error: { message: 'Route not implemented.' } })
  } catch (err) {
    next(err)
  }
})

export default router
