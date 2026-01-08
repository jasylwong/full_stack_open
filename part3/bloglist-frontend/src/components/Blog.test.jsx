import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  name: 'test user name',
  username: 'test user username'
}
const blog = {
  title: 'test title',
  author: 'test author',
  url: 'testurl.com',
  likes: 4242,
  user: user
}

describe('<Blog>', () => {
  test('renders title & author by default, but not url and likes', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    expect(screen.getAllByText('test title', { exact: false })).toBeDefined()
    expect(screen.getAllByText('test author', { exact: false })).toBeDefined()

    const hiddenDiv = container.querySelector('div[style*="display: none"]')
    expect(hiddenDiv).toHaveTextContent('testurl.com')
    expect(hiddenDiv).toHaveTextContent('likes 4242')
  })

  test('shows blog URL and likes when view button clicked', async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const userEventSession = userEvent.setup()
    const button = screen.getByText('view')
    await userEventSession.click(button)

    const visibleDiv = container.querySelector('div[style=""]')
    expect(visibleDiv).toHaveTextContent('testurl.com')
    expect(visibleDiv).toHaveTextContent('likes 4242')
  })
})