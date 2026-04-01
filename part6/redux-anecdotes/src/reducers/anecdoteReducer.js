import { createSlice } from '@reduxjs/toolkit'
import { setNotification, clearNotification } from './notificationReducer'
import anecdoteService from '../services/anecdoteService'

let timerId

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { create, addVote, setAnecdotes } = anecdoteSlice.actions

export const notify = (message, seconds = 5) => {
  return (dispatch) => {
    dispatch(setNotification(message))

    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
    dispatch(notify(`Created: ${newAnecdote.content}`), 6)
  }
}

export const voteWithNotification = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(addVote(votedAnecdote.id))
    dispatch(notify(`You voted for: ${anecdote.content}`), 3)
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer