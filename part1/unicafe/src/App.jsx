import { useState } from 'react'


const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Display = ({text}) => {return (<div>{text}</div>)}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if(all == 0){
    return (
      <div> 
        <Header text="statistics" />
        <Display text='No feedback given'/>
      </div>
    )
  }
  return (
    <div> 
      <Header text="statistics" />
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />

          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}

//Exercise 1.10
const StatisticLine = ({text, value}) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setALL] = useState(0)
  const [average, setAverage] = useState(0.0)
  const [percent, setPercent] = useState(0.0)
  const [percentString, setPercentString] = useState('0 %')



  const goodIncrease = () => {
    setGood(good + 1)
    allIncrease()
    averageCalc((good + 1) + neutral*(0) + bad*(-1), all + 1)
    percentCalc((good + 1), all + 1)
  }

  const neutralIncrease = () => {
    setNeutral(neutral + 1)
    allIncrease()
    averageCalc(good + (neutral + 1)*(0) + bad*(-1), all + 1)
    percentCalc(good, all + 1)
  }

  const badIncrease = () => {
    setBad(bad + 1)
    allIncrease()
    averageCalc(good + neutral*(0) + (bad + 1)*(-1), all + 1)
    percentCalc(good, all + 1)
  }



  const allIncrease = () => setALL(all + 1)
  const averageCalc = (total, count) => setAverage((total/count))
  const percentCalc = (goodCount, total) => {
    let input = (goodCount/total)*100
    setPercent((goodCount/total)*100)
    setPercentString((input.toString()).concat(' %'))
  }


  
  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={goodIncrease} text='good'/>
      <Button onClick={neutralIncrease} text='neutral'/>
      <Button onClick={badIncrease} text='bad'/>
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={percentString}/>
    </div>
  )
}

export default App