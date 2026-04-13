import { useState, useEffect } from 'react'

const Notification = ({ text }) => {
	const [visible, setVisible] = useState(true)
	useEffect(() => {
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [text])

	if (!text || !visible) return null

	return (
		<div className="notification">
			<h4>{text}</h4>
		</div>
	)
}

export default Notification