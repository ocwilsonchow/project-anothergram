import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import uploadFileAsync from '../../../_helpers/upload-file.js'

const updateSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().test(
     'first name must be less than 25 characters',
     (firstName) => !firstName || firstName.length <=25
  ),
  lastName: yup.string().test(
     'last name must be less than 25 characters',
     (lastName) => !lastName || lastName.length <=25
  ),
  username: yup.string().test(
     'username must be less than 20 characters',
     (username) => !username || username.length <=20
  ),
  password: yup.string().test(
    'empty-or-6-characters-check',
    'password must be at least 6 characters',
    (password) => !password || password.length >= 6
  ),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  avatar: yup.mixed(),
  location: yup.string(),
  occupation: yup.string()
})

const controllersApiMyProfileUpdate = async (req, res) => {
  try {
    const userId = req.session.user.id
    const { body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const currentUser = await prisma.user.findUnique({  where: { id: userId } })
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: verifiedData.email,
        firstName: verifiedData.firstName,
        lastName: verifiedData.lastName,
        username: verifiedData.username,
        avatar: verifiedData.avatar || currentUser.avatar || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        ...verifiedData.password && { passwordHash: await bcrypt.hash(verifiedData.password, 10) },
        location: verifiedData.location,
        occupation: verifiedData.occupation
      }
    })

    return res.status(201).json(_.omit(updatedUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileUpdate
