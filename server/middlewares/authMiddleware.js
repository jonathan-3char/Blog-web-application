// Middleware that will check if the request has a session
export function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next("route");
  }
}
