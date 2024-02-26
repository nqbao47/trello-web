import { useState } from 'react'
import { Button } from '@mui/material/'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count + 1)
  }

  return (
    <>
      <p>Brian Nè ^^</p>
      <h1>{count}</h1>
      <Button variant="contained" onClick={handleIncrease}>
        Ấn dô nè
      </Button>
    </>
  )
}

export default App
