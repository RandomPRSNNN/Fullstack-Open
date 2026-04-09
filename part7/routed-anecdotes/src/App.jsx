import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteInfo from './components/AnecdoteInfo'
import Notification from './components/Notification'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import About from './components/About'
import Menu from './components/Menu'

let timerId

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notificationText, setNotificationText] = useState(null)

  const displayNotification = (text) => {
    setNotificationText(text)
    if (timerId) timerId = null

    timerId = setTimeout(() => {
      setNotificationText(null)
    }, 5000)
  }


  const createNewAnecdote = (newAnecdote) => {
    setAnecdotes(current => current.concat(newAnecdote))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(an => an.id === Number(match.params.id)) : null

  return (
    <div>
      <div>
        <Menu />
        <Notification text={notificationText} />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes/:id' element={<AnecdoteInfo anecdote={anecdote} />} />
          <Route path='/create' element={<CreateNew displayNotification={displayNotification} createNewAnecdote={createNewAnecdote} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
