import { useState } from 'react'
import Feedback from '../components/Feedback'
import Statistics from '../components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addBad = () => setBad(bad + 1)
  const addNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <Feedback addGood={addGood} addBad={addBad} addNeutral={addNeutral}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App