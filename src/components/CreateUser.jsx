import { useState } from 'react';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';

import { useUser } from '../context/UserContext';
import Spinner from './Spinner';

const CreateUser = () => {
  const userContext = useUser();

  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const inputName = data.get('name');

    if (isNameValid(inputName) === false) return;

    setShowSpinner(true);
    try {
      await userContext.registerUser({ name: inputName });
    } catch (e) {
      console.error(`Error creating user ${e}`);
    }

    setShowSpinner(false);
  };

  const isNameValid = (name) => {
    if (name.trim() === '') {
      return false;
    }

    return true;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Spinner showSpinner={showSpinner}></Spinner>
      <CssBaseline />
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

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
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
    </Container>
  );
};

export default CreateUser;
