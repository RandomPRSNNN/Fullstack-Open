import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    borderColor: '#375b01',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const state = useSelector(state => state.notification)

  if (state.view) {
    return (
      <div style={style}>
        {state.text}
      </div>
    )
  }
}

export default Notification
