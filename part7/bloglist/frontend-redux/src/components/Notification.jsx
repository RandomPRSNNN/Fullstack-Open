import { useSelector } from 'react-redux'

const Notification = () => {
	const text = useSelector((state) => state.notification.text)
	if (!text) return null

	return (
		<div className="notification">
			{text}
		</div>
	)
}

export default Notification
