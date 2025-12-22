const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = request => {
//   const authorization = request.header('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace("Bearer ", '')
//   }
//   return null
// }

blogsRouter.get('/ping', (_request, response) => {
  response.send(`<h1>Hello!</h1>`)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)

  const { title, author, url, likes } = request.body

  if (!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.title = title ?? blogToUpdate.title
  blogToUpdate.author = author ?? blogToUpdate.author
  blogToUpdate.url = url ?? blogToUpdate.url
  blogToUpdate.likes = likes ?? blogToUpdate.likes

  const updatedBlog = await blogToUpdate.save()
  
  response.status(200).json(updatedBlog)
})

blogsRouter.delete(`/:id`, async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter
