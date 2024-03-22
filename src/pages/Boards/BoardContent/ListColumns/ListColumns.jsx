import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const handleAddNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Oops!! Please enter Columns Title... !')
      return
    }

    // Create data Column để call API
    const newColumnData = {
      title: newColumnTitle
    }

    createNewColumn(newColumnData)

    // Close add form and Clear input
    toggleNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    /**
     * SortableContext yêu cầu items là một mảng ['id-1', 'id-2'],
     * không nhận vào items dạng [{id: 'íd-1'}, {id: 'íd-2'}]
     * khắc phục : items={columns?.map((c) => c._id)}
     */
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map((column) => (
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
        ))}

        {/* Box add new Column */}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleNewColumnForm}
            sx={{
              maxWidth: '250px',
              minWidth: '250px',
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
        ) : (
          <Box
            sx={{
              maxWidth: '250px',
              minWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={handleAddNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.success.main
                  }
                }}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.error.main
                  }
                }}
                onClick={toggleNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
