import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyPostsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    const foundMyPosts = await prisma.post.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })

    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return res.status(200).json({
      posts: foundMyPosts,
      user: foundUser
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsIndex
