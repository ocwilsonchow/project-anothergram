import prisma from "../../_helpers/prisma.js";
import handleErrors from "../../_helpers/handle-errors.js";
import _ from "lodash";

const controllersApiPostsIndex = async (req, res) => {
  try {
    const foundPosts = await prisma.post.findMany({
      where: {
        public: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true
          }
        }
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
