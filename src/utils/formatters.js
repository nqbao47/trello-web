// Capitalize the first letter of a string
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/**
 * Phía FE sẽ tự tạo ra một Card đặc biệt: Placeholder Card, ko lq tới Back-end
 * Card này sẽ đc ẩn ở UI
 * Mỗi Column chỉ có thể có tối đa 1 card đặc biệt
 * cần có _id, boardId, columnId
 */
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
