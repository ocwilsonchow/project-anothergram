import yup from 'yup'

import handleErrors from '../../_helpers/handle-errors.js'
import passport from '../../../_middlewares/passport.js'

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const authenticate = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return res.status(500).end(err.toString())
    if (!user) return res.status(401).json(info)

    req.session.user = { id: user.id }
    await req.session.save()

    return res.status(200).json(user)
  })(req, res, next)
}

const controllersApiAuthLogin = async (req, res, next) => {
  try {
    const { body } = req
    await loginSchema.validate(body, { abortEarly: false, stripUnknown: true })
    return authenticate(req, res, next)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiAuthLogin
