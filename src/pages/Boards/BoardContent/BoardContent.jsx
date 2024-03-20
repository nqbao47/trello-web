import { useState, useEffect, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'

import {
  DndContext,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'

import { cloneDeep, isEmpty } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm 1 column theo CardId
  const findColumnByCardId = (cardId) => {
    // Sử dụng c.cards thay vì c.cardOrderIds => ở bước handleDragOver chúng ta sẽ làm dữ liệu
    // cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // Lấy ra thứ tự của từng card trong column sắp đến
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      // Logic tính toán CardIndex mới
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // Sử dụng lodash để clone mảng OrderedColumnState cũ ra mảng mới để xử lý data
      // sau đó return - update lại OrderedColumnState mới
      const nextColumns = cloneDeep(prevColumns)

      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      // nextActiveColumn: column cũ
      if (nextActiveColumn) {
        // Khi kéo card sang column khác thì xoá card ở column đang active đi
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)

        /** Thêm PlaceholderCard nếu Column empty
         * Sử dụng lodash để check [rỗng]
         * Cần tạo ra func để thực hiện việc thêm PlaceholderCard vào Column rỗng
         *  */
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Update lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      // nextActiveColumn: column mới
      if (nextOverColumn) {
        // Kiểm tra card đã kéo có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trc
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)
        // Phải update lại chuẩn dữ liệu trong columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn
        }
        // Thêm card đã kéo sang column mới theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // Xoá PlaceholderCard đi nếu nó tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard)

        // Update lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      return nextColumns
    })
  }

  // Bắt đầu drag
  const handleDragStart = (e) => {
    // console.log('handleStart: ', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data?.current)

    // Nếu drag card thì mới thực hiện hành động set giá trị oldColumn
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }

  // Xử lý trong quá trình drag
  const handleDragOver = (e) => {
    // Sẽ không làm gì thêm nếu chúng ta đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // console.log('handleDragOver: ', e)
    // Nếu kéo card thì sẽ xử lý thêm để có thể kéo qua lại giữa các Column
    const { active, over } = e

    if (!active || !over) return

    // Hiểu là cụ thể đang kéo card nào
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // Tìm 2 Column (Nơi hiện tại đang chứa card và nơi muốn kéo card tới)
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu ko tồn tại 1 trong 2 column thì không làm gì hết => tránh crash
    if (!activeColumn || !overColumn) return

    // Nếu kéo card qua 2 column != thì sẽ chạy vào đây để xử lý logic
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
    // console.log('activeColumn: ', activeColumn)
    // console.log('overColumn: ', overColumn)
  }

  // Kết thúc drag (drop)
  const handleDragEnd = (e) => {
    const { active, over } = e

    // return luôn để tránh lỗi nếu không tồn tại over || active
    if (!active || !over) return

    // Xử lí kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // Hiểu là cụ thể đang kéo card nào
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      // Tìm 2 Column (Nơi hiện tại đang chứa card và nơi muốn kéo card tới)
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu ko tồn tại 1 trong 2 column thì không làm gì hết => tránh crash
      if (!activeColumn || !overColumn) return

      /**
       * sử dụng oldColumnWhenDraggingCard để lấy ra đc state chứa id gốc của Column ở bước handleDragColumn
       * Sử dụng activeColumn sẽ bị lỗi vì sau khi handleOver thì giá trị của activeColumn đã thay đổi thành Column mới
       * */
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // Kéo thả giữa 2 column khác nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Kéo thả trong cùng column
        // Lấy vị trí cũ của item từ oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((c) => c._id === activeDragItemId)

        // Lấy vị trí mới của item từ overColumn
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới Column mà chúng ta đang drop
          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)

          return nextColumns
        })
      }
    }

    // Xử lí kéo thả Column trong BoardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trị over(sau khi kéo thả) khác với active(vị trí ban đầu)
      if (active.id !== over.id) {
        // Lấy vị trí cũ của item từ active
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)

        // Lấy vị trí mới của item từ over
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

        // dùng arrayMove sắp xếp lại mảng ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        /**
         * Sử dụng dndOrderdColumnIds dùng để xử lý gọi API
         * const dndOrderdColumnIds = dndOrderdColumns.map((c) => c._id)
         * console.log('dndOrderdColumns: ', dndOrderdColumns)
         * console.log('dndOrderdColumns: ', dndOrderdColumnIds)
         * */

        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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

  // Fix Flickering
  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Nếu kéo thả các Column thì vẫn sử dụng thuật toán như cũ (closetCorner)
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // Tìm các điểm giao nhau
      const pointerIntersections = pointerWithin(args)

      // Fix flickering khi kéo 1 card có hình ảnh lên trên cùng ra ngoài boardContent
      if (!pointerIntersections?.length) return
      /**
       * Thuật toán va chạm sẽ trả về một mảng các va chạm ở đây
       * !!pointerIntersections?.length = pointerIntersections?.length > 0
       */
      // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

      // Tìm overId đầu tiên trong intersections
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        // Nếu over là Column thì sẽ tìm đến cardId gần nhất bên trong kv va chạm đó dựa vào closestCorners
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          // console.log('overId before: ', overId)
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            })
          })[0]?.id
          // console.log('overId after: ', overId)
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      sensors={sensors}
      /**
       * Nếu chỉ sử dụng closestCorners sẽ bị bug Flickering + sai data
       * Giải pháp: custom lại thuật toán phát hiện va chạm của DnDkit library để tối ưu kéo thả card
       */
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
