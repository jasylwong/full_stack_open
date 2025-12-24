const { beforeEach, test, describe, after  } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'password123'
}

let userId
let token

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    let response = await api.post('/api/users').send(testUser)
    userId = response.body.id
    
    response = await api.post('/api/login').send(testUser)
    token = response.body.token

    await Blog.insertMany(
      helper.initialBlogs.map(blog => ({ ...blog, user: userId}))
    )
  })

  test('all blogs are returned', async () => {
    const blogsAtStart = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    assert.deepStrictEqual(blogsAtStart.body.length, helper.initialBlogs.length)
  })

  test('blogs has id attribute', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => assert.ok(blog.id, 'Blog is missing id attribute'))
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'new blog',
        author: 'New Author',
        url: 'www.new-url.com',
        likes: 45
      }
      
      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)
        .expect(201).expect('Content-Type', /json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('new blog'))

      const addedBlog = blogsAtEnd.find(b => b.title === 'new blog')
      assert.strictEqual(addedBlog.author, 'New Author')
      assert.strictEqual(addedBlog.url, 'www.new-url.com')
      assert.strictEqual(addedBlog.likes, 45)
    })

    test('likes property defaults as 0 if missing', async () => {
      const token = await helper.createUserAndGetToken('testuser2', 'Test User 2')

      const newBlog = {
        title: 'new blog',
        author: 'New Author',
        url: 'www.new-url.com'
      }

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)
        .expect(201).expect('Content-Type', /json/)

      const blogsAtEnd = await helper.blogsInDb()

      const addedBlog = blogsAtEnd.find(b => b.title === 'new blog')
      assert.strictEqual(addedBlog.likes, 0)
    })

    test('blog without title is not added', async () => {
      const token = await helper.createUserAndGetToken('testuser3', 'Test User 3')

      const newBlog = {
        author: 'New Author',
        url: 'www.new-url.com',
        likes: 5
      }

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
      const token = await helper.createUserAndGetToken('testuser4', 'Test User 4')

      const newBlog = {
        title: 'new blog',
        author: 'New Author',
        likes: 5
      }

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails without valid token', async () => {
      await api.post('/api/blogs').set('Authorization', 'invalid').send({})
        .expect(401).expect('Content-Type', /json/)
    })
  })

  describe('updating of a blog', () => {
    test('succeeds with valid entry', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const paramsToUpdate = { title: 'updated title', likes: blogToUpdate.likes + 1 }

      await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `Bearer ${token}`)
        .send(paramsToUpdate)
        .expect(200)

      const updatedBlog = await Blog.findById(blogToUpdate.id)

      assert.strictEqual(updatedBlog.title, paramsToUpdate.title)
      assert.strictEqual(updatedBlog.author, blogToUpdate.author)
      assert.strictEqual(updatedBlog.url, blogToUpdate.url)
      assert.strictEqual(updatedBlog.likes, paramsToUpdate.likes)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with a status code of 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(b => b.title)

      assert(!titles.includes(blogToDelete.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('fails with a status code of 401 if user is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
    })
  })

  after(() => {
    mongoose.connection.close()
  })
})
