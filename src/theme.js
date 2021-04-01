import { createMuiTheme } from '@material-ui/core/styles'


//Create Theme Settings
const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#DEB992 '
        },
        background: {
            default: '#5CDB95',
            paper: '#05386B',
        },
        text: {
            primary: '#EDF5E1',
            secondary: '#FFF44F',
        }
    }
  })

  export default theme  