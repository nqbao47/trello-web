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

function Card({ card }) {
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

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
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
