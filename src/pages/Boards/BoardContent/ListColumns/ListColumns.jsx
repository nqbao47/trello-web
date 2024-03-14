import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    // SortableContext yêu cầu items là một mảng ['id-1', 'id-2'],
    // không nhận vào items dạng [{id: 'íd-1'}, {id: 'íd-2'}]
    // khắc phục : items={columns?.map((c) => c._id)}
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
          <Column key={column._id} column={column} />
        ))}

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
    </SortableContext>
  )
}

export default ListColumns
