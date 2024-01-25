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

import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';

const CreateGame = () => {
  const gameContext = useGame();

  const exampleCardValues = ['1,2,3,4,5', '2,4,6,8,10', '1,2,3,5,8,13,21'];

  const submitGame = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

        const name= data.get('name')
        const cards= data.get('cards')

    gameContext.createGame(name, cards);
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

        <Box
          component="form"
          onSubmit={submitGame}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Game Name"
            name="name"
            autoFocus
          />
          <Autocomplete
            freeSolo
            options={exampleCardValues}
            renderInput={(param) => (
              <TextField
                {...param}
                name="cards"
                label="Card Values"
                required
                fullWidth
                autoFocus
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1 }}
          >
            Create Game
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateGame;
