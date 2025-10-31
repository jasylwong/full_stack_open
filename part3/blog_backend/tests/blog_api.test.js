const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const express = require('express')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const blogsAtStart = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /json/)

  assert.deepStrictEqual(blogsAtStart.body.length, helper.initialBlogs.length)
})

// test('blogs has id attribute', async () => {
//   const blogs = await helper.blogsInDb()
//   blogs.forEach(blog => assert.ok(blog.id, 'Blog is missing id attribute'))
// })

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'New Author',
    url: 'www.new-url.com',
    likes: 45
  }
  await api.post('/api/blogs').send(newBlog)
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
  const newBlog = {
    title: 'new blog',
    author: 'New Author',
    url: 'www.new-url.com'
  }

  await api.post('/api/blogs').send(newBlog)
    .expect(201).expect('Content-Type', /json/)

  const blogsAtEnd = await helper.blogsInDb()

  const addedBlog = blogsAtEnd.find(b => b.title === 'new blog')
  assert.strictEqual(addedBlog.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'New Author',
    url: 'www.new-url.com',
    likes: 5
  }

  await api.post('/api/blogs').send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'New Author',
    likes: 5
  }

  await api.post('/api/blogs').send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(() => {
  mongoose.connection.close()
})