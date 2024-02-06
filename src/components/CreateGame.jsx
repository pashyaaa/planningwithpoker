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
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
  const gameContext = useGame();
  const navigate = useNavigate();

  const exampleCardValues = ['1,2,3,4,5', '2,4,6,8,10', '1,2,3,5,8,13,21'];

  const submitGame = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get('name');
    const cardsInput = data.get('cards');

    const cards = cardsInput.split(',').map((num) => parseInt(num, 10));

    const createdGame = await gameContext.createGame(name, cards);

    navigate(`/game/${createdGame.id}`);
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
