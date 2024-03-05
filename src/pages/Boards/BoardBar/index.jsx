import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: 1,
  borderRadius: 2,
  marginRight: 2,
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '& .MuiSvgIcon-root:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflow: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2',
        borderBottom: '1px solid white'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="briandev nguyen"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspaces"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to drive icon"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
          variant="outlined"
          startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup
          max={5}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/409865083_2424639167925872_6397475883338814608_n.jpg?stp=dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_ohc=lEt0M7rW2BIAX_r6Pve&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfANWh3rZz55UtrToHRZpGCsoV7XSbRX6VNhVmfBJfOsFg&oe=65E631E4"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/170255673_1692498007806662_988643893894692557_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=NT3xjUscJTsAX989RAp&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfBQdXYuuI7ipo_ZdAgtvQc3xt-cjU2HN3NKwOr5IcS1ww&oe=6608C5C4"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/149047203_210718704083600_7236532784966159011_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0bb214&_nc_ohc=f7NsO03LLVsAX_nTmhy&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfARBM7BbxTSkkiZW9cwGCZFHKyRfDuTOSA4LCV28G3FJA&oe=6608D82D"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/176067217_1326505607732947_1945213687047368145_n.jpg?stp=c0.106.640.640a_dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=g8xF3zGJBAsAX-ebfZR&_nc_oc=AQnhBFDKuLF_y6T6Q4gKMRE_AzNDXNce94sX93_1f00LIHCVGpYzVXw0N6YCTxnmkZbhRe0dTO2L-ueMIQhYZpn8&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfAzht-7zqlk3qR0qbd7F31wOiuRGN1-AqH8Ng-dLukrmA&oe=6608D75D"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/98851682_1083332515383592_3669268716492685312_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=104&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=z_FutB3J0hUAX_kmBVN&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfDcUUq0VojmPIFw1wJOFzbl7-W6xJ-3p0yBCbGRL6x-LA&oe=6608D637"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/98851682_1083332515383592_3669268716492685312_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=104&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=z_FutB3J0hUAX_kmBVN&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfDcUUq0VojmPIFw1wJOFzbl7-W6xJ-3p0yBCbGRL6x-LA&oe=6608D637"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/98851682_1083332515383592_3669268716492685312_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=104&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=z_FutB3J0hUAX_kmBVN&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfDcUUq0VojmPIFw1wJOFzbl7-W6xJ-3p0yBCbGRL6x-LA&oe=6608D637"
            />
          </Tooltip>
          <Tooltip title="briannguyen">
            <Avatar
              alt="Babi"
              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/98851682_1083332515383592_3669268716492685312_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s851x315&_nc_cat=104&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=z_FutB3J0hUAX_kmBVN&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfDcUUq0VojmPIFw1wJOFzbl7-W6xJ-3p0yBCbGRL6x-LA&oe=6608D637"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
