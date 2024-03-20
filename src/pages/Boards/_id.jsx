import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnsAPI, createNewCardAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)
  const [column, setColumn] = useState(null)

  useEffect(() => {
    // Lấy id từ url để call tới api getDetails
    const boardId = '65f93725343ef7f09a24fad7'

    // CallAPI
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  // Call API để tạo mới 1 Column và set lại State cho Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnsAPI({
      ...newColumnData,
      boardId: board._id
    })
    console.log('createdColumn: ', createdColumn)

    // Update state board
  }

  // Call API để tạo mới 1 Column và set lại State cho Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard: ', createdCard)

    // Update state board
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
