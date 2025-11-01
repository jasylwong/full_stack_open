const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/ping', (_request, response) => {
  response.send(`<h1>Hello!</h1>`)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  
  response.status(201).json(result)
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
