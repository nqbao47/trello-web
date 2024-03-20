import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

// Config react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import theme from '~/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
    <ToastContainer position="bottom-right" theme="colored" closeOnClick />
  </CssVarsProvider>
  // </React.StrictMode>
)
