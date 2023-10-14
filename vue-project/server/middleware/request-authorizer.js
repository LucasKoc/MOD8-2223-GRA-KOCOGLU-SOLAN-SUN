// Request authorizer route-level middleware
export function createAuthorizer(permissions, requireAll = true) {
  return async (req, res, next) => {
    try {
      const user = req.session.user

      const authorized =
        requireAll === false
          ? verifyUserHasAnyRequiredPermissions(user, permissions)
          : verifyUserHasAllRequiredPermissions(user, permissions)

      if (authorized) {
        return next() // Pass request to next request handler or middleware
      } else {
        next(createAuthorizationError()) // Pass error with status 403 Forbidden (actually means unauthorized) to next error handler middleware
      }
    } catch (err) {
      next(err)
    }
  }
}

function verifyUserHasAnyRequiredPermissions(user, permissions) {
  for (const permission of permissions) {
    const authorized = user.permissions.find((p) => p.name === permission) !== undefined
    if (authorized) {
      return true // Authorization succeeded, because the authenticated user has at least one of the required permissions
    }
  }

  return false // Authorization failed, because the authenticated user has none of the required permissions
}

function verifyUserHasAllRequiredPermissions(user, permissions) {
  for (const permission of permissions) {
    const authorized = user.permissions.find((p) => p.name === permission) !== undefined
    if (!authorized) {
      return false // Authorization failed, because the authenticated user does not have all of the required permissions
    }
  }

  return true // Authorization succeeded, because the authenticated user has all of the required permissions
}

export function createAuthorizationError() {
  const err = new Error('Request unauthorized.')
  err.status = 403 // Set status to 403 Forbidden (actually means unauthorized)
  return err
}

export default createAuthorizer
