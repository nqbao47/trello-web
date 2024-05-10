import { useState, useEffect } from 'react'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import PeopleIcon from '@mui/icons-material/People'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Menu from '@mui/material/Menu'

import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import AddCardIcon from '@mui/icons-material/AddCard'

function Card({ card }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card } // Bổ sung data sau khi đã kéo thả
  })

  const dndKitCardStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor

    // transform: CSS.Transform.toString(transform),
    transform: CSS.Translate.toString(transform), // Translate giúp tránh bị bể kích thước (stretch) item khi kéo thả
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  useEffect(() => {
    if (!open) {
      setIsHovered(false)
    }
  }, [open])

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main
        }

        /** others way to hidden empty Column
         * overflow: card?.FE_PlaceholderCard ? 'hidden' : 'unset',
         * height: card?.FE_PlaceholderCard ? '0px' : 'unset'
         **/
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
        {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      </Typography>

      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>{card?.title}</Typography>
        </CardContent>

        <Box>
          {isHovered && (
            <Tooltip title="More Option">
              <EditIcon
                sx={{
                  fontSize: '1rem',
                  color: 'text.primary',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  mr: '5px'
                }}
                id="basic-card-dropdown"
                s
                aria-controls={open ? 'basic-menu-card-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
          )}
          <Menu
            id="basic-menu-card-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-card-dropdown' }}
          >
            <MenuItem
              // onClick={toggleNewCardForm}
              sx={{
                '&:hover': {
                  color: 'success.light',
                  '& .add-new-card': {
                    color: 'success.light '
                  }
                }
              }}
            >
              <ListItemIcon>
                <AddCardIcon className="open-card-detail" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Open card detail</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit label</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Duplicate</ListItemText>
            </MenuItem>

            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </MenuItem>
            <MenuItem
              // onClick={handleDeleteColumn}
              sx={{
                '&:hover': {
                  color: 'warning.dark',
                  '& .delete-forever-icon': {
                    color: 'warning.dark'
                  }
                }
              }}
            >
              <ListItemIcon>
                <DeleteForeverIcon className="delete-forever-icon" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {shouldShowCardAction() && (
        <CardActions sx={{ p: '0 4px 8px 4px', justifyContent: 'space-between', color: 'primary.main' }}>
          <Tooltip title="people">
            {!!card?.memberIds?.length && (
              <Button>
                <PeopleIcon sx={{ cursor: 'pointer' }} />
                {card?.memberIds?.length}
              </Button>
            )}
          </Tooltip>
          <Tooltip title="comment">
            {!!card?.comments?.length && (
              <Button>
                <ModeCommentIcon sx={{ cursor: 'pointer' }} />
                {card?.comments?.length}
              </Button>
            )}
          </Tooltip>
          <Tooltip title="attachment">
            {!!card?.attachments?.length && (
              <Button>
                <AttachmentIcon sx={{ cursor: 'pointer' }} />
                {card?.attachments?.length}
              </Button>
            )}
          </Tooltip>
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
