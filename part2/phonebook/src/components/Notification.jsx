const Notification = ({ message, notificationError}) => {
    if (message === null) {
        return null
    }

    const styleClass = notificationError ? 'error' : 'notification'

    return (
        <div className={`notificationBasic ${styleClass}`}>
            {message}
        </div>
    )
}

export default Notification