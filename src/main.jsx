import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

// Config react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Config MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

import theme from '~/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        confirmationButtonProps: { color: 'success', size: 'medium', variant: 'contained' },
        cancellationButtonProps: { color: 'error', size: 'medium', variant: 'outlined' }
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-right" theme="colored" closeOnClick />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
