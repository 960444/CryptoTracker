import {React} from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {Typography, makeStyles} from '@material-ui/core'


//Component Styling
const useStyles = makeStyles((theme) => ({
   title: {
       textAlign: 'center',
       padding: theme.spacing(1),
       
   }
})) 

//Set Header Font
const headFont = createMuiTheme({
    typography: {
      fontFamily: [
        'Ubuntu',
      ].join(','),
    },
    palette: {
        text: {
            primary: '#EDF5E1',
        }
    }

})


export default function Title() {
    //Initialize Styling
    const classes = useStyles()

    //Render Component
    return (
        <div className={classes.title}>
            <ThemeProvider theme={headFont}>
                <Typography variant="h2" color="textPrimary"> CryptoTracker </Typography>
            </ThemeProvider>
        </div>
    )
}