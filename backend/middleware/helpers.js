export const isAuthenticated = (req, res, next) => {
  if (!req.session.username) {
    return res.status(401).json({ error: "You are not authenticated." });
  }
  next();
};
