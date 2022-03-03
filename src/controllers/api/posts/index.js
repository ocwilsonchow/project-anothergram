import prisma from "../../_helpers/prisma.js";
import handleErrors from "../../_helpers/handle-errors.js";
import _ from "lodash";

const controllersApiPostsIndex = async (req, res) => {
  console.log('search')
  try {
    // Filters
    const q = req.query.q || ''

    // Common where query
    const where = {
      public: true,
      OR: [
        {
          title: {
            contains: q
          }
        }, {
          content: {
            contains: q
          }
        },{
          user: {
            username: {
              contains: q
            }
          }
        },
      ]
    }



    const foundPosts = await prisma.post.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true
          }
        },
       comment: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true
              }
            }
          }
        },
       tag: true
      }
    });

    return res.status(200).json({
      posts: foundPosts,
    });
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiPostsIndex;
