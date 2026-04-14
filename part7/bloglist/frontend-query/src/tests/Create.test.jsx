import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Create from '../components/Create'

describe('<Create />', () => {
    test('form calls the event handler with the right details returned', async () => {
        const createBlog = vi.fn()
        const user = userEvent.setup()

        render(<Create createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const submitButton = screen.getByText('Create')

        await user.type(titleInput, 'Testing React Forms')
        await user.type(authorInput, 'Edwin V')
        await user.type(urlInput, 'www.test.com')

        await user.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        const submittedData = createBlog.mock.calls[0][0]

        expect(submittedData.title).toBe('Testing React Forms')
        expect(submittedData.author).toBe('Edwin V')
        expect(submittedData.url).toBe('www.test.com')
    })
})