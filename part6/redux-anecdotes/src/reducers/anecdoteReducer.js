import { createSlice } from '@reduxjs/toolkit'
import { setNotification, clearNotification } from './notificationReducer'

const initialState = [
  {
    id: 1,
    content: 'If it hurts, do it more often',
    votes: 0
  },
  {
    id: 2,
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    id: 3,
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    id: 4,
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    id: 5,
    content: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    id: 6,
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  }
]

let timerId //ensure timers are tracked

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    create(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },

    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ?
          anecdote : updatedAnecdote
      )
    }
  }
})

const getId = () => (100000 * Math.random()).toFixed(0)

export const createWithNotification = (content) => {
  return async (dispatch) => {
    dispatch(create(content))

    dispatch(setNotification(`Created:  ${content}`))

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const voteWithNotification = (anecdote) => {
  return async (dispatch) => {
    dispatch(addVote(anecdote.id))

    dispatch(setNotification(`You voted for: ${anecdote.content}`))

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { create, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer