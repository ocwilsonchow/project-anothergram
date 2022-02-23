import _ from 'lodash'

import prisma from '../_helpers/prisma.js'
import handleErrors from '../_helpers/handle-errors.js'

const controllersApiFindUser = async (req, res) => {
  try {
    const userId = req.params.id
    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      select: {
        username: true,
        email: true,
      },
      rejectOnNotFound: true })

    return res.status(201).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiFindUser
