import yup from "yup";

import prisma from "../../_helpers/prisma.js";
import handleErrors from "../../_helpers/handle-errors.js";

const createSchema = yup.object({
  content: yup.string().required(),
});

const controllersApiCommentCreate = async (req, res) => {
  try {
    const data = req.body
    const userId = req.session.user.id
    const postId = 24
    const verifiedData = await createSchema.validate(data, { abortEarly: false, stripUnknown: true })
    const newComment = await prisma.comment.create({
      data: {
        content: verifiedData.content,
        postId: postId,
        userId: userId
      }
    })

    return res.status(201).json(newComment)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiCommentCreate;
