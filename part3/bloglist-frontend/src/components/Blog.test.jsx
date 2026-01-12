import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

const user = {
  name: 'test user name',
  username: 'test user username'
}
const blog = {
  title: 'test title',
  author: 'test author',
  url: 'testurl.com',
  likes: 34,
  user: user
}

describe('<Blog>', () => {
  test('renders title & author by default, but not url and likes', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    expect(screen.getAllByText('test title', { exact: false })).toBeDefined()
    expect(screen.getAllByText('test author', { exact: false })).toBeDefined()

    const hiddenDiv = container.querySelector('div[style*="display: none"]')
    expect(hiddenDiv).toHaveTextContent('testurl.com')
    expect(hiddenDiv).toHaveTextContent('likes 34')
  })

  test('shows blog URL and likes when view button clicked', async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const userEventSession = userEvent.setup()
    const button = screen.getByText('view')
    await userEventSession.click(button)

    const visibleDiv = container.querySelector('div[style=""]')
    expect(visibleDiv).toHaveTextContent('testurl.com')
    expect(visibleDiv).toHaveTextContent('likes 34')
  })

  test('increases like count when like button clicked twice', async () => {
    const mockHandler = vi.fn()
    blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

    render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>)

    const userEventSession = userEvent.setup()
    const button = screen.getByText('like')
    await userEventSession.click(button)
    await userEventSession.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})