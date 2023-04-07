const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  //fetching the authorization header
  const authHeader = req.headers['authorization']

  // if auth header and split the auth header Bearer sdfdfs
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  // verifying the auth token with the signed token
  jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
    console.log(err)

    if (err) return res.status(403).json({
      "error":"Authentication error"
    })

    req.user = user

    next()
  })
}