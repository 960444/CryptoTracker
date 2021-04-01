
import React, {useEffect, useState} from 'react'
import { Card, Typography, Grid, CardContent} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CountUp from 'react-countup'
import coinGecko from '../APIs/coinGecko' 


//Component Styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        //display: 'flex',
        direction: 'row',
        justify: 'center',
        alignItems: 'center',
    },
    card: {
        margin: theme.spacing(3),
        backgroundColor: '#05386B',
        maxWidth: '250px',
        textAlign: 'center',
        borderBottom: '5px solid #EDF5E1',
        borderTop: '5px solid #EDF5E1'
    },
})) 

export default function Cards() {
    //Initialize styling
    const classes = useStyles()

    //Initialize state
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //Request data from API
    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const request = await coinGecko.get("/global")
            console.log(request.data)
            setGlobalData(request.data)
            setIsLoading(false)
        }
        fetchData()
    }, [])
    
    //Display component
    const renderData = () => {
        const updated = new Date(globalData.data.updated_at * 1000).toDateString()
        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card} elevation={20}>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom> 
                                    Cryptocurrencies
                                </Typography>
                                <Typography variant="h6" component="h2" color="textSecondary">
                                    <CountUp start={0} end={globalData.data.active_cryptocurrencies} duration={3} separator="," />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <Card className={classes.card} elevation={20}>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    Active Markets  
                                </Typography>
                                <Typography variant="h6" component="h2" color="textSecondary">
                                    <CountUp start={0} end={globalData.data.markets} duration={2.75} separator="," />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card} elevation={20}>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom> 
                                    Market Cap
                                </Typography>
                                <Typography variant="h6" component="h2" color="textSecondary">
                                    {globalData.data.market_cap_change_percentage_24h_usd.toFixed(2)}%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card} elevation={20}>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    Last Update
                                </Typography>
                                <Typography  variant="h6"  color="textSecondary" gutterBottom>
                                    {updated}
                                 </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }

    //Render conditionally
    if(isLoading) {
        return <div>Loading...</div>
    } else { 
        return renderData()
    }
}