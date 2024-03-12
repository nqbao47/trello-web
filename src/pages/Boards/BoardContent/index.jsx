import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import PeopleIcon from '@mui/icons-material/People'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
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
        {/* Box column 1 */}
        <Box
          sx={{
            maxWidth: '300px',
            minWidth: '300px',
            ml: 2,
            borderRadius: '6px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`
          }}
        >
          {/* Box column HEADER */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'fontSupperBold'
              }}
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More Option">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-column-dropdown' }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPasteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>paste</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Box LIST CARD */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} - 
              ${COLUMN_FOOTER_HEIGHT}
            )`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '10px',
                cursor: 'pointer'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf',
                borderRadius: '10px'
              }
            }}
          >
            {/* 1st card */}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://wallpapers.com/images/featured/stardew-valley-ltuynqpjb7c95ffq.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>brian dev</Typography>
              </CardContent>
              <CardActions
                sx={{ p: '0 4px 8px 4px', justifyContent: 'space-between', color: 'primary.main' }}
              >
                <Tooltip title="people">
                  <Button>
                    <PeopleIcon sx={{ cursor: 'pointer' }} />
                    20
                  </Button>
                </Tooltip>
                <Tooltip title="comment">
                  <Button>
                    <ModeCommentIcon sx={{ cursor: 'pointer' }} />
                    20
                  </Button>
                </Tooltip>
                <Tooltip title="attachment">
                  <Button>
                    <AttachmentIcon sx={{ cursor: 'pointer' }} />
                    20
                  </Button>
                </Tooltip>
              </CardActions>
            </Card>
            {/* 2nd card */}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Box column FOOTER */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
