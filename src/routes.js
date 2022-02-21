import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// STATIC
router.get('/', (await import('./controllers/static/home.js')).default)

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | MY POST
router.post('/api/my/posts',authenticateUser('json'), (await import('./controllers/api/my/posts/create.js')).default)
router.get('/api/my/posts',authenticateUser('json'), (await import('./controllers/api/my/posts/index.js')).default)

// API | PROFILE
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/update.js')).default)

// API | COMMUNITY


// PAGE | AUTH
router.get('/auth/signup', authenticateUser('json'), (await import('./controllers/pages/auth/signup.js')).default)
router.get('/auth/login', authenticateUser('json'), (await import('./controllers/pages/auth/login.js')).default)

// PAGE | POST
router.get('/posts', (await import('./controllers/pages/posts/index.js')).default)
router.get('/posts/:id', (await import('./controllers/pages/posts/show.js')).default)

// PAGE | MY POST
router.get('/my/posts', authenticateUser('json'),(await import('./controllers/pages/my/posts/index.js')).default)
router.get('/my/posts/create', authenticateUser('json'),(await import('./controllers/pages/my/posts/create.js')).default)
router.get('/my/posts/:id', authenticateUser('json'),(await import('./controllers/pages/my/posts/show.js')).default)
router.get('/my/posts/:id/edit', authenticateUser('json'),(await import('./controllers/pages/my/posts/edit.js')).default)

// PAGE | PROFILE
router.get('/my/profile/edit', authenticateUser('json'),(await import('./controllers/pages/my/profile/edit.js')).default)

// PAGE | COMMUNITY
// router.get('/community', (await import('./controllers/pages/community/index.js')).default)

// PAGES | NOT FOUND
router.use((await import('./controllers/pages/not-found.js')).default)


export default router
