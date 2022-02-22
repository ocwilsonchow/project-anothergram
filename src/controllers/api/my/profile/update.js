import _ from 'lodash'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyProfileUpdate = async (req, res) => {
  try {
    const userId = req.session.user.id
    const foundUser = await prisma.user.findUnique({ where: {id: userId}, rejectOnNotFound: true })

    return res.status(201).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileUpdate
