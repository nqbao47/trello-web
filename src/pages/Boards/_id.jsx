import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'

import { useEffect, useState } from 'react'
import {
  fetchBoardDetailsAPI,
  createNewColumnsAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsAPI,
  searchItemsAPI
} from '~/apis'

import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Lấy id từ url để call tới api getDetails (tạm thời hard-code)
    const boardId = '65f93725343ef7f09a24fad7'

    // CallAPI
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp thứ tự các Columns ở đây trước khi đẩy xuống bên dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        // Fix lỗi Column Empty: Xử lý lỗi kéo thả Card vào 1 Column nếu nó empty
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp thứ tự các Cards ở đây trước khi đẩy xuống bên dưới
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  // Call API để tạo mới 1 Column và set lại State cho Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnsAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Fix lỗi Column Empty: khi tạo Column mới thì nó sẽ chưa có Card ẩn
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Update state board sau khi tạo Column
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Call API để tạo mới 1 Column và set lại State cho Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Update state board khi tạo Card
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)

      // Xóa các placeholder cards
      columnToUpdate.cards = columnToUpdate.cards.filter((card) => !card._id.includes('-placeholder-card'))
      columnToUpdate.cardOrderIds = columnToUpdate.cards.map((card) => card._id)
    }
    setBoard(newBoard)
  }

  /**
   * Call API ngay sau khi kéo thả xong Column
   * Chỉ cần call API để update mảng columnOrderIds của Board chứa nó (thay đổi vị trí trong mảng)
   */
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)

    // Update lại state board cho chuẩn dữ liệu sau khi kéo thả Column
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // Call API update Board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  /**
   * Khi di chuyển Card trên cùng Column:
   * Chỉ cần call API để update mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
   */
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update cho chuẩn dũ liệu board State
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Call API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /** [API] Các bước kéo thả Cards sang Column khác
   * B1: Update mảng cardOrderIds của Column ban đầu chứa nó (Xoá _id của Card ra khỏi mảng)
   * B2: Update mảng cardOrderIds của Column tiếp theo (Thêm _id của Card vào mảng)
   * B3: Update lại  trường columnId mới của cái Card đã kéo
   * => làm 1 API riêng
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // Update lại state board cho chuẩn dữ liệu sau khi kéo thả Column
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    /**
     * Debug lỗi di chuyển Card cuối cùng trong Column sang Column khác. Vì Column rỗng
     * sẽ chứa -placeholder-card nên cần phải xoá nó đi trước khi gửi lên BE
     */
    let prevCardOrderIds = dndOrderedColumns.find((c) => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []

    // Call API xử lý phía Backend
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)?.cardOrderIds
    })
  }

  // Xử lý xoá 1 Column và Cards bên trong nó
  const deleteColumnDetails = (columnId) => {
    // Update lại state board cho chuẩn dữ liệu
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((_id) => _id !== columnId)
    setBoard(newBoard)

    // Call API xoá Column (phía BE)
    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult)
    })
  }

  // Call API to search
  const searchItems = async (searchQuery) => {
    return searchItemsAPI(searchQuery)
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar searchItems={searchItems} />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
