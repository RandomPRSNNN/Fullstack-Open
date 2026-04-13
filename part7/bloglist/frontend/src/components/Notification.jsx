import { useSelector } from 'react-redux'

const Notification = () => {
	const text = useSelector((state) => state.notification.text)
	if (!text) return null

	return (
		<div className="notification">
			<h4>{text}</h4>
		</div>
	)
}

export default Notification
