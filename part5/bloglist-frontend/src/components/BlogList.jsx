import Blog from "./Blog"

const BlogList = ({ blogs, user }) => {
    const logOut = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p style={{ fontWeight: 'bold' }}>
                {user.name} is logged in
                <button onClick={logOut}>Logout</button>
            </p>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        </div>
    )
}

export default BlogList