const { describe, beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret_password', 10)
    const user = new User({ username: 'root_username', name: 'root_name', passwordHash })

    await user.save()
  })

  test('all users are returned', async () =>  {
    const usersAtStart = await User.find({})

    const usersAtEnd = await api.get('/api/users')
      .expect(200)

      assert.strictEqual(usersAtEnd.body.length, usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      name: 'name1',
      username: 'username1',
      password: 'password1'
    }

    await api.post('/api/users').send(newUser)
      .expect(201)

    const usersAtEnd = await User.find({})

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})


after(() => {
  mongoose.connection.close()
})