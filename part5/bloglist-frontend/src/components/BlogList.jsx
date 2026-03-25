import Blog from "./Blog"

const BlogList = ({ blogs, user, setNotificationText }) => {
    const logOut = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    const mostLikedFirst = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>Blogs</h2>
            <p style={{ fontWeight: 'bold' }}>
                {user.name} is logged in
                <button onClick={logOut}>Logout</button>
            </p>
            <div>
                {mostLikedFirst.map(blog =>
                    <Blog
                        user={user}
                        setNotificationText={setNotificationText}
                        key={blog.id}
                        blog={blog} />
                )}
            </div>
        </div>
    )
}

export default BlogList