import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Autocomplete,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

const CreateGame = () => {
  const submitGame = (e) => {
    e.preventDefault();
  };
  return (
    <Container component="main" maxWidth="xs">
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
          <CasinoIcon />
        </Avatar>

        <Box component="form" onSubmit={submitGame} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="game-id"
            label="Game Id"
            name="gameId"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1 }}
          >
            Join Game
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateGame;
