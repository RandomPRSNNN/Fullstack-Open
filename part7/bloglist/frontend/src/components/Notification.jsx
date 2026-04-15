import { Snackbar, Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
	const text = useSelector((state) => state.notification.text)
	if (!text) return null

	return (
		<Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<Alert severity="info" variant="filled" sx={{ width: '100%' }}>
				{text}
			</Alert>
		</Snackbar>
	)
}

export default Notification
