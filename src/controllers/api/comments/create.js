import yup from "yup";

import prisma from "../../_helpers/prisma.js";
import handleErrors from "../../_helpers/handle-errors.js";

const createSchema = yup.object({
  content: yup.string().required(),
});

const controllersApiCommentCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newComment = await prisma.comment.create({
      data: {
        userId, verifiedData
      }
    })
    console.log(newComment)
    return res.status(201).json(newComment)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiCommentCreate;
