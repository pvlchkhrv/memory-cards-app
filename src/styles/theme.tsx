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
                marginTop: 30,
                padding: 20,
                overflowY: 'auto',
            }

        },
        MuiButton: {
            root: {
                textTransform: 'uppercase'
            }
        },
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
            // InputLabelProps: {
            //     shrink: true
            // }
        },
    }

})
