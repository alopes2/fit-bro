import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
          <img src="/favicon-96.png" className="logo" alt="Vite logo" />
      </div>
      <h1>Welcome to FitBuddy</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Under construction...
        </p>
      </div>
    </div>
  )
}

export default App
