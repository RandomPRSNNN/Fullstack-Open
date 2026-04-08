import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setText':
      return action.message
    case 'clearText':
      return ''
    default:
      return state
  }
}


const NotificationContext = createContext()
export default NotificationContext

let timerId = null
export const NotificationContextProvider = (props) => {
  const [text, textDispatch] = useReducer(notificationReducer, '')

  const setNotification = (message, seconds = 5) => {
    textDispatch({ type: 'setText', message })

    if (timerId) {
      timerId = null
    }

    timerId = setTimeout(() => {
      textDispatch({ type: 'clearText' })
    }, (seconds * 1000))
  }

  return (
    <NotificationContext.Provider value={{ text, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
