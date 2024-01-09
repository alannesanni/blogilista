const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

test('there in right amount of blogs', async () => {
  const response = await api
    .get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is in right form', async () => {
    const response = await api
      .get('/api/blogs')
  
      expect(response.body[0].id).toBeDefined()
  })

test('a valid blog can be added ', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContainEqual(
        "Type wars"
    )
  })

test('if likes has no value, it is set to be 0', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        __v: 0
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const indexOfAddedBlog = response.body.findIndex(blog => blog.title === "Type wars")
    const likesOfAddedBlog = response.body[indexOfAddedBlog].likes

    expect(likesOfAddedBlog).toEqual(0)
    })

test('error if title is missing', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    })

test('error if url is missing', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
        __v: 0
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    })


test('blog can be deleted', async () => {
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length - 1)
  })

test('blog data can be updated', async () => {
    const updatedBlog = {
        likes: 100}

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(updatedBlog)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)

    const indexOfUpdatedBlog = response.body.findIndex(blog => blog.title === "React patterns")
    const likesOfUpdatedBlog = response.body[indexOfUpdatedBlog].likes
    expect(likesOfUpdatedBlog).toEqual(100)
    })


afterAll(async () => {
  await mongoose.connection.close()
})