import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
   title: yup.string().required(),
  content: yup.string().required(),
  image: yup.string(),
  public: yup.boolean().transform((value) => !!value)
})

const controllersApiPostsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: verifiedData
    })
    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiPostsUpdate
]
