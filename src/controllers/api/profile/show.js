import _ from "lodash";

import prisma from "../../_helpers/prisma.js";
import handleErrors from "../../_helpers/handle-errors.js";

const controllersApiProfileUpdate = async (req, res) => {

  try {
    const userId = req.params.id;
    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        post: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            public: true
          },
          include: {
            comment: true,
            user: {
              select: {
                username: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
      },
      rejectOnNotFound: true,
    });

    return res.status(201).json(_.omit(foundUser, ["passwordHash"]));
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiProfileUpdate;
