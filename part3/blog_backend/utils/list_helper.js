const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => (favorite.likes > blog.likes ? favorite : blog), {})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const [author, count] = Object.entries(authorCounts)
    .reduce((max, current) => current[1] > max[1] ? current : max)

  return { author, blogs: count }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const [author, likes] = Object.entries(authorLikes)
  .reduce((max, current) => current[1] > max[1] ? current : max)

  return { author, likes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }