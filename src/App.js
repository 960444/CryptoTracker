
import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Cards from './Components/Cards.js'
import CoinInfo from './Components/CoinInfo.js'
import TopCurrencies from './Components/TopCurrencies.js'
import Title from './Components/Title.js'



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#fcfcfc',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
})) 

/*
function MainPage() {
  return(
    <div>
        <Cards />
        <Charts />
    </div>
  )
}
*/

export default function App() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Title />
        </Grid>
        <Grid item xs={12}>
          <Cards />
        </Grid>
        <Grid item xs={12} md={3}>
          <TopCurrencies/>  
        </Grid>
        <Grid item xs={12} md={8}>
          <CoinInfo />
        </Grid>
      </Grid>
    </div>
  );
}


