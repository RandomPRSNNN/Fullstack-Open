const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('failed to fetch')
    }

    return await response.json()
}

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 }),
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('failed to create')
    }

    return await response.json()
}

const vote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if (!response.ok) {
        throw new Error('failed to vote')
    }

    return await response.json()
}

export default { getAll, createNew, vote }