import { useState } from 'react';

import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider,
} from '@mui/material';

import {
  AccountCircle,
  Settings,
  Logout,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';

import { useUser } from '../context/UserContext';
import EditUserModal from './EditUserModal';
import UserProfilePicture from './UserProfiePicture';

const User = () => {
  const userContext = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditUserClick = () => setEditUserModalOpen(true);
  const handleModalClose = () => setEditUserModalOpen(false);

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {userContext.userProfilePictureUrl ? (
          <UserProfilePicture />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        sx={{
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '3.5rem',
            right: '2.5rem',
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEditUserClick}>
          <UserProfilePicture></UserProfilePicture> {userContext.user.name}
          <ListItemIcon>
            <ModeEditOutlineOutlined
              fontSize="small"
              sx={{ marginLeft: '2rem' }}
            />
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Leave Game
        </MenuItem>
      </Menu>

      <EditUserModal
        showModal={editUserModalOpen}
        closeModal={handleModalClose}
      ></EditUserModal>
    </div>
  );
};

export default User;
