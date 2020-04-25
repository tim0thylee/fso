import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const Statistic = ({stats, text}) => (
    <tr>
      <td>{text}</td>
      <td>{stats}</td>
    </tr>
)

const Statistics = ({good, bad, neutral, total, net}) => {
  return (
    <table>
      <tbody>
        <Statistic stats={good} text={"good"}/>
        <Statistic stats={neutral} text={"neutral"}/> 
        <Statistic stats={bad} text={"bad"}/>
        <Statistic stats={total} text={"all"} />
        <Statistic stats={net/total} text={"average"} />
        <Statistic stats={good/total} text={"positive"}/>
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [net, setNet] = useState(0)

 const setHandleGood = props => {
  setGood(good + 1)
  setTotal(good + neutral + bad + 1)
  setNet(net + 1)
 }

 const setHandleNeutral = props => {
  setNeutral(neutral + 1)
  setTotal(good + neutral + bad + 1)
 }

 const setHandleBad = props => {
  setBad(bad + 1)
  setTotal(good + neutral + bad + 1)
  setNet(net - 1)
 }
  return (
    <div>
      <Header text={"give feedback"}/>
      <Button handleClick={setHandleGood} text={"good"} />
      <Button handleClick={setHandleNeutral} text={"neutral"}/>
      <Button handleClick={setHandleBad} text={"bad"}/>
      <Header text={"statistics"}/>
      {total === 0 ? 
        <div>No feedback given</div> : 
        <Statistics 
          good={good} 
          bad={bad} 
          neutral={neutral} 
          total={total} 
          net={net}/>
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

