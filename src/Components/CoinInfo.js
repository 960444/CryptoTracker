
import {React, useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {FormControl, InputLabel, Select, MenuItem, Grid, Paper, Typography, Box} from '@material-ui/core'
import clsx from 'clsx'
import coinGecko from '../APIs/coinGecko'
import Chart from './Chart.js'


//Create Styling
const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'Center',
    padding: theme.spacing(0),
    margin: theme.spacing(0)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    borderColor: '#fff',
    '& label.Mui-focused': {
      color: '#FFF44F',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFF44F',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFF44F',
      },  
      '&:hover fieldset': {
        borderColor: '#FFF44F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF44F',
      },
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    borderBottom: '5px solid #EDF5E1',
    borderTop: '5px solid #EDF5E1'
  },
})) 

export default function Charts() {
  //Initialize Styling
  const classes = useStyles()
  //Set State
  const [state, setState] = useState({
    coin: 'bitcoin',
    vs_currency: 'usd'
  })

  //Format Chart Data
  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      }
    })
  }

  //Initialize State
  const [coins, setCoins] = useState([])
  const [coinData, setCoinData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  
  //Fetch and Load Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: state.vs_currency,
          per_page: 30,
        },
      })
      setCoins(response.data)
    }
    
    const fetchGraphData = async () => {
      setIsLoading(true);
      //Send data requests simultaneously 
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${state.coin}/market_chart/`, {
          params: {
            vs_currency: state.vs_currency,
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${state.coin}/market_chart/`, {
          params: {
            vs_currency: state.vs_currency,
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${state.coin}/market_chart/`, {
          params: {
            vs_currency: state.vs_currency,
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: state.vs_currency,
            ids: state.coin,
          },
        }),
      ])
      
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      })
      setIsLoading(false);
    }    
    fetchData()
    fetchGraphData()
  }, [state]);

  //Update state when the user changes the select menu
  const handleChange = (event) => {
    const name = event.target.name
    setState({...state, [name]: event.target.value})
  }

   

  //Display component
  const renderData = () => {
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={clsx(classes.formControl)}>
                <InputLabel>Coin</InputLabel>
                <Select name="coin" onChange={handleChange} label="Coin" value={state.coin}>
                  {
                    coins.map(coin => {
                      return (<MenuItem value={coin.id}>{coin.name}</MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={clsx(classes.formControl)}>
                <InputLabel>Currency</InputLabel>
                <Select name="vs_currency" onChange={handleChange} label="Currency" value={state.vs_currency}>
                  {
                    ['usd', 'gbp', 'eur', 'chf', 'jpy', 'rub', 'pln', 'cny', 'btc', 'eth'].map(currency => {
                      return (<MenuItem value={currency}>{currency}</MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11}>
              <Chart data={coinData} />
            </Grid>
            <Grid item xs={11}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" color="textPrimary">Market Cap </Typography>
                <Typography variant="h6" color="textSecondary">{coinData.detail.market_cap}</Typography>
              </Grid>
              <Grid item xs={6} md={4}> 
                <Typography variant="h6" color="textPrimary">Total Supply </Typography>
                <Typography variant="h6" color="textSecondary">{coinData.detail.total_supply}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" color="textPrimary">Total Volume </Typography>
                <Typography variant="h6" color="textSecondary">{coinData.detail.total_volume}</Typography>
              </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="h6" color="textPrimary">24H High </Typography>
                  <Typography variant="h6" color="textSecondary">{coinData.detail.high_24h}</Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="h6" color="textPrimary">24H Low </Typography>
                  <Typography variant="h6" color="textSecondary">{coinData.detail.low_24h}</Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="h6" color="textPrimary">Circulating Supply</Typography>
                  <Typography variant="h6" color="textSecondary">{coinData.detail.circulating_supply}</Typography>
                </Grid>                  
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Box m={5} />
      </div>
  )}
  //Render if loaded
  if(isLoading) {
    return <div>Loading...</div>
  } else { 
    return renderData()
  }
}
