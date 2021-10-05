import {createTheme} from '@material-ui/core';

export const theme = createTheme({
    palette: {
        primary: {
            main:'#673ab7'
        },
    },
    typography: {
        fontFamily: 'Comic Sans MS',
    },
    shape: {
        borderRadius: 10
    },
    overrides: {
        MuiContainer: {
            root: {
                display: 'flex',
                justifyContent: 'center',
                margin: 20,
                padding: 20,
                overflowY: 'auto',
            }

        },
        MuiButton: {
            root: {
                textTransform: 'uppercase',
                width: '130px',
            }
        },
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
        },
    }

})
