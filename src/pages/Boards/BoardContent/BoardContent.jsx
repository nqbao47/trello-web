import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstrant: {
  //     distance: 10
  //   }
  // })

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

  // CÙng 1 lúc chỉ có thể có một phần tử đang đc kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Bắt đầu drag
  const handleStart = (e) => {
    console.log('handleStart: ', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data?.current)
  }

  // Kết thúc drag (drop)
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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // Tạo animation items kéo thả
  const myDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleStart} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={myDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
