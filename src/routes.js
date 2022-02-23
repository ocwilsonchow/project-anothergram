import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// STATIC
router.get('/', (await import('./controllers/static/home.js')).default)

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

//API | All POSTS
router.get('/api/posts', (await import('./controllers/api/posts/index.js')).default)
router.get('/api/posts/:id', (await import('./controllers/api/posts/show.js')).default)

// API | MY POST
router.post('/api/my/posts',authenticateUser('json'), (await import('./controllers/api/my/posts/create.js')).default)
router.get('/api/my/posts',authenticateUser('json'), (await import('./controllers/api/my/posts/index.js')).default)
router.get('/api/my/posts/:id',authenticateUser('json'), (await import('./controllers/api/my/posts/show.js')).default)
router.put('/api/my/posts/:id',authenticateUser('json'), (await import('./controllers/api/my/posts/update.js')).default)
router.delete('/api/my/posts/:id',authenticateUser('json'), (await import('./controllers/api/my/posts/destroy.js')).default)

// API | FIND USER
router.get('/api/user/:id', (await import('./controllers/api/findUser.js')).default)


// API | PROFILE
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)
router.put('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/update.js')).default)

// API | COMMUNITY
router.get('/api/community', (await import('./controllers/api/community/index.js')).default)


// PAGE | AUTH
router.get('/auth/signup',(await import('./controllers/pages/auth/signup.js')).default)
router.get('/auth/login',  (await import('./controllers/pages/auth/login.js')).default)

// PAGE | POST
router.get('/posts', (await import('./controllers/pages/posts/index.js')).default)
router.get('/posts/:id', (await import('./controllers/pages/posts/show.js')).default)

// PAGE | MY POST
router.get('/my/posts', authenticateUser('html'),(await import('./controllers/pages/my/posts/index.js')).default)
router.get('/my/posts/create', authenticateUser('html'),(await import('./controllers/pages/my/posts/create.js')).default)
router.get('/my/posts/:id', authenticateUser('html'),(await import('./controllers/pages/my/posts/show.js')).default)
router.get('/my/posts/:id/edit', authenticateUser('html'),(await import('./controllers/pages/my/posts/edit.js')).default)

// PAGE | PROFILE
router.get('/my/profile/edit', authenticateUser('html'),(await import('./controllers/pages/my/profile/edit.js')).default)

// PAGE | COMMUNITY
router.get('/community', (await import('./controllers/pages/community/index.js')).default)

// PAGES | NOT FOUND
router.use((await import('./controllers/pages/not-found.js')).default)


export default router
