import { Router } from 'express'

const router = Router()

// STATIC
router.get('/', (await import('./controllers/static/home.js')).default)

// AUTH | API
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
// router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
// router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// AUTH | PAGE



// POST | API



// POST | PAGE



// PROFILE | API


// PROFILE | PAGE



// COMMUNITY | API


// COMMUNITY | PAGE



export default router
