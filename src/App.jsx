import { useState } from 'react'
import { Button } from '@mui/material/'

import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

// const theme = extendTheme({
//   // ...your custom theme
// })

function App() {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count + 1)
  }

  return (
    <>
      <ModeToggle />
      <hr />
      <p>Brian Nè ^^</p>
      <h1>{count}</h1>
      <Button variant="contained" onClick={handleIncrease}>
        Ấn dô nè
      </Button>
    </>
  )
}

export default App
