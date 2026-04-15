import { useState } from 'react'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Display = ({text, count}) => {
  return (<div>{text} {count}</div>)
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodIncrease = () => setGood(good + 1)
  const neutralIncrease = () => setNeutral(neutral + 1)
  const badIncrease = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={goodIncrease} text='good'/>
      <Button onClick={neutralIncrease} text='neutral'/>
      <Button onClick={badIncrease} text='bad'/>
      
      <Header text="statistics" />
      <Display text='good' count={good} />
      <Display text='neutral' count={neutral} />
      <Display text='bad' count={bad} />
    </div>
  )
}

export default App