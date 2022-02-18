// Libraries used to create the server
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import expressLayouts from 'express-ejs-layouts'
import compileSass from 'express-compile-sass'
import methodOverride from 'method-override'
import moment from 'moment'
import { ironSession } from 'iron-session/express'

import parseData from './src/_middlewares/parse-data.js'
import addUserToLayout from './src/_middlewares/add-user-to-layout.js'

const app = express() // The instance that "host" our server
const port = process.env.PORT || 3000 // The port number our server runs on

// Allow views to have access to moment library
app.locals.moment = moment

// Setting the folder for our views and setting ejs as our views engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Allows us to use a layout.ejs file as our layout
app.use(expressLayouts)

// Allows us to use scss
app.use(compileSass({
  root: `${process.cwd()}/public`,
  sourceMap: true,
  sourceComments: true,
  watchFiles: true,
  logToConsole: false
}))

// Defining public folder for browser to access files
app.use(express.static('public'))

// Prints out request information
app.use(morgan('tiny'))

// Give forms the ability to use DELETE and PUT method
app.use(methodOverride('_method'))

app.use(ironSession({
  cookieName: 'iron-session',
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}))
app.use(addUserToLayout)

app.use(express.urlencoded({ extended: true })) // parses url queries to req.query
app.use(express.json()) // parses json to req.body
app.use(parseData) // parses multi-part to req.body and req.files

// Defining the routes for our server
app.use('/', (await import('./src/routes.js')).default)

// Starts the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App listening at http://localhost:${port}`)
})
