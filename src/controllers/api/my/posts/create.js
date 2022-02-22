import yup from "yup";

import prisma from "../../../_helpers/prisma.js";
import handleErrors from "../../../_helpers/handle-errors.js";

const createSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  image: yup.string(),
  public: yup.boolean()
});

const controllersApiMyPostsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newPost = await prisma.post.create({
      data: {
        userId,
        ...verifiedData,
      }
    })
    console.log(newPost)
    return res.status(201).json(newPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsCreate;
