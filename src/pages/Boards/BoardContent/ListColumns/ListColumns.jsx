import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'

function ListColumns() {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />

      {/* Box add new Column */}
      <Box
        sx={{
          maxWidth: '200px',
          minWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          bgcolor: '#ffffff3d',
          height: 'fit-content'
        }}
      >
        <Button
          startIcon={<AddBoxIcon />}
          sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
        >
          Add new Comlumn
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
