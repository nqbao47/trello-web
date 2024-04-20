import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - (${APP_BAR_HEIGHT} + ${BOARD_BAR_HEIGHT}))`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const colors = {
  darkModeAppBar: '#2c3e50',
  darkModeBoardBar: '#2c3e50',
  darkModeBoardContent: '#34495e',
  darkModeColumn: '#333643',

  lightModeAppBar: '#748E63',
  lightModeBoardBar: '#748E63',
  lightModeBoardContent: '#99B080',
  lightModeColumn: '#ebecf0'
}

// Create a theme instance.
const theme = extendTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontSupperBold: 700,
    fontSupperRegular: 600,
    fontSupperMedium: 500,
    fontSupperLight: 100
  },
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    colors: colors
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '10px',
            height: '10px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '10px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#fff',
            borderRadius: '10px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.875rem' }
      }
    },
    // chỉ ghi đè body1 thôi
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {
            borderWidth: '0.2px !important'
          },
          '&:hover fieldset': {
            borderWidth: '2px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important'
          }
        }
      }
    }
  }
})

export default theme
