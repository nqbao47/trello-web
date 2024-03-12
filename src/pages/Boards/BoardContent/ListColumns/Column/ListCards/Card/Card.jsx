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

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>brian dev</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}>
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
    </MuiCard>
  )
}

export default Card
