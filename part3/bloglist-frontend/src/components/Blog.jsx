import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1}
    const returnedBlog = await blogService.update(blog.id, changedBlog)
    updateBlog(returnedBlog)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.destroy(blog.id)
      deleteBlog(blog)
    }
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button> 
      </div>
      <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <br/>
          {blog.url}
          <br/>
          likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
          <br/>
          {blog.user.name}
          {blog.user.username === user.username && (
            <>
              <br/>
              <button onClick={() => handleRemove(blog)}>remove</button>
            </>
          )}
      </div>
   </div>
  )
}

export default Blog