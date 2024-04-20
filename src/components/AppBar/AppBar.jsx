import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Workspaces from './Menus/Workspace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Profiles from './Menus/Profiles'
import Search from '~/components/Search/Search'

function AppBar({ searchItems }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? theme.trello.colors.darkModeAppBar : theme.trello.colors.lightModeAppBar,
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={FavoriteBorderIcon} inheritViewBox fontSize="large" sx={{ color: 'white' }} />
          <Typography
            variant="span"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Mercilaz
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />

          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>

      {/* Right side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Search searchItems={searchItems} />
        <ModeSelect />
        <Tooltip title="Notification ^^">
          <Badge sx={{ cursor: 'pointer' }} color="warning" variant="dot">
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Notification ^^">
          <Badge sx={{ cursor: 'pointer' }} color="secondary">
            <HelpOutlineIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
