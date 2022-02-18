import { Router } from 'express'

const router = Router()

// STATIC
router.get('/', (await import('./controllers/static/home.js')).default)

// API | AUTH
// router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
// router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
// router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | POST


// API | PROFILE


// API | COMMUNITY



// PAGE | AUTH
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)
router.get('/auth/login', (await import('./controllers/pages/auth/login.js')).default)


// PAGE | POST


// PAGE | PROFILE
router.get('/profile', (await import('./controllers/pages/posts/index.js')).default)

// PROFILE | COMMUNITY



export default router
