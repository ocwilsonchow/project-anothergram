import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../controllers/_helpers/prisma.js'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) return done(null, false, { email: 'Email Not Found' })
    if (!await bcrypt.compare(password, user.passwordHash)) return done(null, false, { password: 'Incorrect Password' })
    return done(null, _.omit(user, ['passwordHash']))
  } catch (err) {
    return done(err)
  }
}))

export default passport
