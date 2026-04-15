import { render, screen, cleanup } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

const blog = {
    title: 'Testing is fun',
    author: 'Edwin Valentelis',
    likes: 6,
    url: 'google.com',
    user: {
        name: 'Edwin Va',
        username: "valentelis"
    }
}

const userData = {
    name: "Dora",
    username: "potatoes"
}

describe('<Blog />', () => {
    beforeEach(() => {
        render(<Blog blog={blog} user={userData} />)
    })

    test('displays title and author only', async () => {
        const element = screen.getByText('Testing is fun by Edwin Valentelis')
        expect(element).toBeDefined()

        const urlElement = screen.queryByText('google.com')
        expect(urlElement).toBeNull()

        const likesElement = screen.queryByText(/6/)
        expect(likesElement).toBeNull()
    })

    test('click to show url and likes', async () => {
        const user = userEvent.setup()

        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likes = screen.getByText(/6/)
        expect(likes).toBeDefined()

        const url = screen.getByText(blog.url)
        expect(url).toBeDefined()
    })

    test('like button pressed twice', async () => {
        cleanup()

        const likeFunction = vi.fn()
        render(<Blog blog={blog} user={userData} handleBlogLike={likeFunction} />)

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeFunction.mock.calls).toHaveLength(2)
    })
})