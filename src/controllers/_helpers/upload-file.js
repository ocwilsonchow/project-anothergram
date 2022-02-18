import AWS from 'aws-sdk'
import fs from 'fs'
import _ from 'lodash'

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION
})

const uploadFileAsync = async (data, { files }) => {
  const fileKeys = Object.keys(files)

  const promises = []

  for (let i = 0; i < fileKeys.length; i += 1) {
    const key = fileKeys[i]
    const file = files[key]

    if (_.get(data, key)) {
      // Read content from the file
      const fileContent = fs.readFileSync(file.filepath)

      // Setting up S3 upload parameters
      const params = {
        ACL: 'public-read',
        Bucket: process.env.S3_BUCKET,
        Key: file.newFilename, // File name you want to save as in S3
        Body: fileContent
      }

      // Replace the body file with a url
      _.set(data, key, `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${file.newFilename}`)

      // Uploading files to the bucket and push promise for Promise.all
      promises.push(s3.upload(params).promise().then((uploadedFile) => {
        fs.unlinkSync(file.filepath)
        return uploadedFile.Location
      }).catch((err) => {
        fs.unlinkSync(file.filepath)
        return err
      }))
    } else {
      fs.unlinkSync(file.filepath)
    }
  }

  await Promise.all(promises)
}

export default uploadFileAsync
