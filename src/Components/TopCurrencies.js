import {React, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import coinGecko from '../APIs/coinGecko'
import { Typography, Paper, Divider } from '@material-ui/core';

//Component Styling
const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
        padding: theme.spacing(5),
        borderBottom: '5px solid #EDF5E1',
        borderTop: '5px solid #EDF5E1',
        margin: theme.spacing(2)
        
    },
    divider: {
        background: 'white',
        margin: theme.spacing(1)
    },
 })) 


export default function TopCurrencies() {
    //Initialize styling
    const classes = useStyles()

    //Initialize state
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    //Fetch data from the API
    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const request = await coinGecko.get("/search/trending")
            setData(request.data.coins)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    //Display Component
    const renderData = () => {
        return (
            <div>
                <Paper elevation={3} className={classes.container}> 
                    <Typography variant="h5">Most Searched Coins (24h)</Typography>
                    <Divider  classes={{root: classes.divider}} />
                    {data.map(item => {return (<Typography color="textSecondary" gutterBottom>{item.item.name} </Typography>)})}
                    <Divider  classes={{root: classes.divider}} />
                </Paper>
            </div>
        )
    }

    //Render Conditionally
    if(isLoading) {
        return <div>Loading...</div>
    } else { 
        return renderData()
    }
}