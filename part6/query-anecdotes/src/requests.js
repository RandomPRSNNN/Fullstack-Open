const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch notes')
    }
    return await response.json()
}

export const newAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: anecdote,
            votes: 0
        })
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
    }

    return await response.json()
}

export const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }
    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if (response.Error) {
        throw new Error('Creation failed')
    }

    return await response.json()
}