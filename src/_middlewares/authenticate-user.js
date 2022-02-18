const authenticateUser = (format) => (req, res, next) => {
  if (!req.session?.user?.id) {
    if (format === 'json') return res.status(401).json('Please Login First!')
    if (format === 'html') return res.render('not-permitted')
  }
  return next()
}

export default authenticateUser
