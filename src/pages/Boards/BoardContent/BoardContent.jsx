import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstrant: {
      distance: 10
    }
  })

  // Yêu cầu chuột di chuyển 10px thì mới active event => fix click gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  // Nhấn giữ 250ms thì mới kích hoạt event => trường hợp màn hình cảm ứng
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })

  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (e) => {
    const { active, over } = e

    // return luôn để tránh lỗi nếu không tồn tại over(đích đến của drag)
    if (!over) return

    // Nếu vị trị over(sau khi kéo thả) khác với active(vị trí ban đầu)
    if (active.id !== over.id) {
      // Lấy vị trí cũ của item từ active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)

      // Lấy vị trí mới của item từ over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // Sử dụng dndOrderdColumnIds dùng để xử lý gọi API
      // const dndOrderdColumnIds = dndOrderdColumns.map((c) => c._id)
      // console.log('dndOrderdColumns: ', dndOrderdColumns)
      // console.log('dndOrderdColumns: ', dndOrderdColumnIds)

      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
