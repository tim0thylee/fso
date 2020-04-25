import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const findMostVotes = () => {
    let largestValue = votes[mostVotes];
    let largestIndex = mostVotes
    votes.forEach((vote, i) => {
      if (vote > largestValue) {
        largestValue = votes[i];
        largestIndex = i;
      }
    })
    setMostVotes(largestIndex)
  }

  const handleClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
    findMostVotes()
  }
  
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1;
    setVotes([...copy])
    findMostVotes();
  }

  return (
    <div>
      <h1>Anectdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
        <div>has {votes[selected]} votes</div>
      </div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anectdote</button>
      </div>
      <h2>Anectdote with the most votes</h2>
      {/* ui is one behind the change of state, so we do a ui check right here */}
      {votes[selected] > votes[mostVotes] ? props.anecdotes[selected] : anecdotes[mostVotes]}
      <div> 
      has {votes[selected] > votes[mostVotes] ? votes[selected] : votes[mostVotes]} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
