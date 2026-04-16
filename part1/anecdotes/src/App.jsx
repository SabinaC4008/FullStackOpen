import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const Display = ({sectionTitle, text, count}) => {
  return (
    <div>
      <h1>{sectionTitle}</h1>
      <div>{text}</div>
      <div>has {count} votes</div>
    </div>
  )}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [currCount, setCurrCount] = useState(0)
  const [maxCountIndex, setMaxCountIndex] = useState(0);
  //const [maxVote, setMaxVote] = useState(0);
  const handleQoute = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newIndex)
    setCurrCount(vote[newIndex])
  }
  const handleVote = () => {
    const tempArray = vote 

    tempArray[selected] += 1
    setVote[tempArray]
    setCurrCount(tempArray[selected]) 
    if(tempArray[selected] > tempArray[maxCountIndex]){
      setMaxCountIndex(selected)
    }
  }


  return (
    <div>
      <Display sectionTitle="Anecdote of the day" text={anecdotes[selected]} count={currCount} />
      <div>
        <Button onClick={handleVote} text="vote" />
        <Button onClick={handleQoute} text="new qoute" />
      </div>
      <Display sectionTitle="Anecdote with most votes" text={anecdotes[maxCountIndex]} count={vote[maxCountIndex]} />
    </div>
  )
}

export default App