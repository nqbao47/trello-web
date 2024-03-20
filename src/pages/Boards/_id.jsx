import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnsAPI, createNewCardAPI } from '~/apis'

import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Lấy id từ url để call tới api getDetails (tạm thời hard-code)
    const boardId = '65f93725343ef7f09a24fad7'

    // CallAPI
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Fix lỗi Column Empty: Xử lý lỗi kéo thả Card vào 1 Column nếu nó empty
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
    }
    setBoard(newBoard)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </Container>
  )
}

export default Board
