import Header from "../components/Header"
import Content from "../components/Content"
import Total from "../components/Total"

const App = () => {
  const course = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const partArr = [{title: part1, exercises: exercises1}, {title: part2, exercises: exercises2}, {title: part3, exercises: exercises3}];

  return (
    <>
      <Header course={course}/>
      <Content data={partArr}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </>
  )
}

export default App