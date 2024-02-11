import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import {
  Avatar,
  Button,
  TextField,
  Box,
  Modal,
  Typography,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';

import { useUser } from '../context/UserContext';
import Spinner from './Spinner';
import { useGame } from '../context/GameContext';

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

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Spinner showSpinner={showSpinner}></Spinner>
        <Typography variant="h4">Edit Player Name</Typography>
        <Box
          sx={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleOutlined />
          </Avatar>

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
