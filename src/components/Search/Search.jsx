import { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { debounce } from 'lodash'

function Search({ searchItems }) {
  const [searchValue, setSearchValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const debounceSearch = debounce(async (searchQuery) => {
    try {
      // Gọi hàm searchItems từ component cha và nhận kết quả tìm kiếm
      const searchResults = await searchItems(searchQuery)
      const result = searchResults.map((rs) => ({
        title: rs.title
      }))
      setSuggestions(result) // Cập nhật gợi ý từ kết quả tìm kiếm
    } catch (error) {
      throw new Error(error)
    }
  }, 2000)

  // Function để thực hiện tìm kiếm và cập nhật gợi ý
  const handleSearch = async (searchQuery) => {
    setSearchValue(searchQuery) // Cập nhật giá trị tìm kiếm
    debounceSearch(searchQuery)
  }

  return (
    <Autocomplete
      id="search-autocomplete"
      freeSolo
      options={suggestions || []}
      getOptionLabel={(option) => (option && option.title) || ''} // Kiểm tra xem option và option.title có tồn tại không
      renderInput={(params) => (
        <TextField
          {...params}
          id="outlined-search"
          label="Search here..."
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{
            minWidth: '220px',
            maxWidth: '180px',
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
      )}
    ></Autocomplete>
  )
}

export default Search
