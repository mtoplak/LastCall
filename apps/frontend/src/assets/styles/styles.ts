import { createTheme } from "@mui/material";

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const paperStyle = {
    padding: 20,
    height: '50vh',
    width: 280,
    margin: '20px auto',
};

export const avatarStyle = { backgroundColor: '#1bbd7e' };

export const btnstyle = { margin: '8px 0' };


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export const checkoutButton = {
    mt: 2,
    backgroundColor: '#0F1B4C',
    color: '#FFFFFF',
    border: '2px solid #0F1B4C',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#0F1B4C',
    },
};