import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Modal,
  Typography,
} from '@mui/material';

import { useUser } from '../context/UserContext';
import Spinner from './Spinner';
import { useGame } from '../context/GameContext';
import UserProfilePicture from './UserProfiePicture';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',
};

const EditUserModal = ({ showModal, closeModal }) => {
  const userContext = useUser();
  const gameContext = useGame();

  const [inputName, setInputName] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newName = data.get('name');

    if (newName.trim() === '') return;

    setShowSpinner(true);
    try {
      await userContext.setNewUserName(newName);
      await gameContext.updatePlayerName(userContext.user.id, newName);
      closeModal();
    } catch (e) {
      console.error(`Error updating name ${e}`);
    }

    setShowSpinner(false);
  };

  useEffect(() => {
    if (userContext.user) {
      setInputName(userContext.user.name);
    }
  }, [userContext]);

  const handleChangeInputName = (e) => {
    const name = e.target.value;
    setInputName(name);
  };

  const onProfilePictureFileSelected = async (e) => {
    if (e.target.files[0]) {
      try {
      setShowSpinner(true);
      await userContext.setProfilePicture(e.target.files[0]);
      setShowSpinner(false);
      } catch (e) {
        setShowSpinner(false);
        console.error('Error uploading image: ', e);
      }
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Spinner showSpinner={showSpinner}></Spinner>
        <Typography variant="h5">Edit Player</Typography>
        <Box
          sx={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginLeft: '1rem',
            }}
          >
            <UserProfilePicture></UserProfilePicture>
            {/* <Avatar
              alt="Profile Picture"
              src={
                userContext.profilePictureUrl
                  ? userContext.profilePictureUrl
                  : null
              }
              sx={{
                width: '5rem',
                height: '5rem',
                marginRight: '0.5rem',
              }}
            ></Avatar> */}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >

              {/* <Button variant="text" component="label">
                <Typography> Upload new picture </Typography>
                <VisuallyHiddenInput
                  type="file"
                  onChange={onProfilePictureFileSelected}
                  accept="image/*"
                ></VisuallyHiddenInput>
              </Button> */}
              {userContext.profilePictureUrl && (
                <Button variant="text">
                  <Typography color={'#f24f21'}>Delete picture</Typography>
                </Button>
              )}
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={inputName}
              onChange={handleChangeInputName}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1 }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

EditUserModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditUserModal;
