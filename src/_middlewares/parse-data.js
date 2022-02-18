import formidable from 'formidable'
import _ from 'lodash'
import fs from 'fs'
import { URL } from 'url'

const dirname = `${new URL('.', import.meta.url).pathname}../../tmp`
if (!fs.existsSync(dirname)) fs.mkdirSync(dirname)

const parseData = (req, res, next) => {
  const form = formidable({ uploadDir: dirname, keepExtensions: true, multiples: true })

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json(err)

    req.body = fields
    req.files = files

    Object.keys(files).forEach((key) => {
      if (files[key].size > 0) {
        _.set(req.body, key, files[key])
      } else {
        fs.unlinkSync(files[key].filepath)
        delete req.files[key]
      }
    })

    return next()
  })
}

export default parseData
