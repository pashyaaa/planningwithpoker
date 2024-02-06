import { Box, Button, List, ListItem, Typography } from '@mui/material';

const CardArea = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '0',
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          <Typography>Choose your card</Typography>
        </Box>
        <Box
          sx={{
            boxSizing: 'border-box',
            outlineColor: '#74b3ff',
            display: 'block',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              padding: '0',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              textAlign: 'center',
              userSelect: 'none',
              whiteSpace: 'none',
              paddingY: '1rem',
            }}
          >
            {arr.map((item) => {
              return (
                <ListItem
                  key={item}
                  sx={{
                    display: 'inline-block',
                    padding: 0,
                    margin: '0 0.2rem',
                    transition: 'all 0.1s linear',
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                    ':hover': {
                      marginTop: '-0.3rem',
                    },
                  }}
                >
                  <Button
                    sx={{
                      border: '2px solid #3993ff',
                      cursor: 'pointer',
                      outline: '0',
                      textAlign: 'center',
                      transition: 'all 0.09s linear',
                      borderRadius: '0.8rem',
                      fontSize: '19px',
                      height: '5rem',
                      width: '3rem',
                      minWidth: '3rem',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#3993ff',
                        fontWeight: 700,
                        marginY: 'auto',
                        fontSize: '19px',
                      }}
                    >
                      {item}
                    </Typography>
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CardArea;
