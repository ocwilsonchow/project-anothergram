import _ from 'lodash'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyProfileUpdate = async (req, res) => {
  try {
    const { session: { user: { id } } } = req
    const foundUser = await prisma.user.findUnique({ where: { id }, rejectOnNotFound: true })

    return res.status(201).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileUpdate
