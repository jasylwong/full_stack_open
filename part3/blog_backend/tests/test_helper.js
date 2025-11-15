const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Title1',
    author: 'Auth1',
    url: 'Url1',
    likes: '1'
  },
  {
    title: 'Title2',
    author: 'Auth2',
    url: 'Url2',
    likes: '2'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }