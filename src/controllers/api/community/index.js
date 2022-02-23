import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiCommunityIndex = async (req, res) => {
  try {
    const foundUsers = await prisma.user.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    return res.status(200).json({
      users: foundUsers
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiCommunityIndex
