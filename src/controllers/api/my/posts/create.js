import yup from "yup";

import prisma from "../../../_helpers/prisma.js";
import handleErrors from "../../../_helpers/handle-errors.js";
import uploadFileAsync from '../../../_helpers/upload-file.js'


const createSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  imageURL: yup.mixed(),
  public: yup.boolean().transform((value) => !!value)
});

const controllersApiMyPostsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const newPost = await prisma.post.create({
      data: {
        userId: userId,
        title: verifiedData.title,
        content: verifiedData.content,
        imageURL: verifiedData.imageURL || '',
        public: verifiedData.public
      }
    })
    return res.status(201).json(newPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsCreate;
