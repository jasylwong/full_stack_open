import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm>', () => {
  test('calls createBlog with correct details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Testing React Forms')
    await user.type(authorInput, 'Jane Doe')
    await user.type(urlInput, 'https://example.com/testing')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Testing React Forms',
      author: 'Jane Doe',
      url: 'https://example.com/testing'
    })
  })
})
