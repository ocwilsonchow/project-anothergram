import { Router } from 'express'

const router = Router()

// STATIC
router.get('/', (await import('./controllers/static/home.js')).default)

// AUTH | API



// AUTH | PAGE



// POST | API



// POST | PAGE



// PROFILE | API


// PROFILE | PAGE




// COMMUNITY | API


// COMMUNITY | PAGE



export default router
