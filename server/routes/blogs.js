import express from 'express'
import * as controller from '../controllers/controller.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()
router.use(requireAuth)

// GET - take all blogs
router.get('/', controller.getBlogs)


// GET - take one blog
router.get('/:id', controller.getBlog)

// POST - create new blog
router.post('/', controller.createBlog)

// PATCH - edit one blog
router.patch('/:id', controller.updateBlog)

// DELETE - delete one blog
router.delete('/:id', controller.deleteBlog)

export default router