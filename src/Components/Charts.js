
import {React, useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, InputLabel, Select, MenuItem, Grid, Paper, Typography, Box} from '@material-ui/core'
import { SatelliteSharp } from '@material-ui/icons';
import {Bar, Line, Pie} from 'react-chartjs-2'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    main: {
        textAlign: 'Center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
        borderColor: '#fff',
        '& label.Mui-focused': {
            color: '#FFF',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#FFF',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFF',
            },  
            '&:hover fieldset': {
              borderColor: '#000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000',
            },
          },
    },
    
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
        borderBottom: '10px solid #5B5EA6'
    },
})) 


export default function Charts() {
    const classes = useStyles()

    const [state, setState] = useState({
        brand: 'All',
        time: 'Alltime'
    })

    const [chartData, setChartData] = useState({})
    const [causeChartData, setCauseChartData] = useState({})
    const [mileageChartData, setMileageChartData] = useState({})
    const [transmissionChartData, setTransmissionChartData] = useState({})
    const [fuelChartData, setFuelChartData] = useState({})
    const [modelChartData, setModelChartData] = useState({})

    const chartConfig = {
        legend: { labels: {fontColor: 'white'}}, 
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: 'white',
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'white',
                }
            }]
        }
    }


    const charts = () => {
        //get all days between two dates
        setChartData({
            labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            datasets: [
                {
                    label: 'Number of Recalls',
                    data: [3560, 7888, 2380, 11230, 8972, 9234, 8111, 13490, 15690],
                    backgroundColor: '#CFE7AC',
                    borderColor: '#88B04B',
                    fill: true,
                },
                {
                    label: 'Number of Injuries',
                    data: [345, 579, 203, 1390, 690, 350, 776, 892, 789],
                    borderColor: '#EFC050',
                    backgroundColor: '#F5D78F',
                    fill: true,
                },
                {
                    label: 'Number of Deaths',
                    data: [20, 45, 12, 60, 26, 32, 28, 95, 102],
                    borderColor: '#FF6F61',
                    backgroundColor: '#FF8484',
                    fill: true,
                },
        ]
        })
        setCauseChartData({
            labels: ['Hydraulics', 'Electrical System', 'Suspension', 'Air Bags', 'Fuel System', 'Power Train', 'Seats', 'Engine'],
            datasets: [
                {
                    label: 'Total Amount',
                    backgroundColor: '#DD4124',
                    data: [1239, 1139, 873, 779, 562, 231, 150, 89]
                }
            ]
        })
        setMileageChartData({
            labels: ['0-5000 mi', '5001-15000 mi', '15001-25000 mi', '25001-50000 mi', '50000-70000 mi', '700000+ mi'],
            datasets: [
                {
                    label: 'Total Amount',
                    backgroundColor: '#45B8AC',
                    data: [892, 1123, 1459, 4812, 11389, 8902]
                }
            ]
        })
        setTransmissionChartData({
            labels: ['Manual', 'Automatic'],
            datasets: [
                {
                    label: 'Transmission Type',
                    backgroundColor: ['#1c82cc', '#59166b'],
                    data: [67, 33]
                }
            ]
        })
        setFuelChartData({
            labels: ['Diesel', 'Petrol', 'Electric', 'Hybrid'],
            datasets: [
                {
                    label: 'Fuel Type',
                    backgroundColor: ['#9B2335', '#1c82cc', '#EFC050', '#88B04B'],
                    data: [23, 47, 10, 20]
                }
            ]
        })
        setModelChartData({
            labels: ['Chevrolet Silverado', 'Subaru Crosstrek', 'Infiniti Q50', 'Ford Explorer', 'Toyota 4Runner'],
            datasets: [{
                label: 'Total Amount',
                backgroundColor: '#EFC050',
                data: [21239, 21030, 19728, 15562, 15231, 13450, 11289]
            }]
        })
    }

    useEffect(() => {
        charts()
    }, [])

    const handleChange = (event) => {
        const name = event.target.name
        setState({...state,[name]: event.target.value})
        console.log(state.brand, state.time)
    }

    return (
        <div className={classes.main}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={clsx(classes.formControl)}>
                        <InputLabel>Brand</InputLabel>
                        <Select name="brand" onChange={handleChange} label="Car Brand" value={state.brand}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Toyota">Toyota</MenuItem>
                            <MenuItem value="Nissan">Nissan</MenuItem>
                            <MenuItem value="Chevrolet">Chevrolet</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={clsx(classes.formControl)}>
                        <InputLabel>Time Period</InputLabel>
                        <Select name="time" onChange={handleChange} label="Time Period" value={state.time}>
                            <MenuItem value="Daily">Daily</MenuItem>
                            <MenuItem value="Weekly">Weekly</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Yearly">Yearly</MenuItem>
                            <MenuItem value="Alltime">All Time</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <Typography color="textSecondary" gutterBottom>
                        Recalls, Injuries and Deaths
                    </Typography>
                    <Paper className={classes.paper} elevation="20">
                        <Line data={chartData} options={chartConfig}/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Typography color="textSecondary" gutterBottom>
                        Recall Causes
                    </Typography>
                    <Paper className={classes.paper} elevation="20">
                        <Bar data={causeChartData} options={chartConfig}/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Typography color="textSecondary" gutterBottom>
                        Mileage at Recall
                    </Typography>
                    <Paper className={classes.paper} elevation="20">
                        <Bar data={mileageChartData} options={chartConfig}/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                <Typography color="textSecondary" gutterBottom>
                        Recalled Vehicle Transmission %
                    </Typography>
                    <Paper className={classes.paper} elevation="20">
                        <Pie data={transmissionChartData} options={{legend: { labels: {fontColor: 'white'}}}}/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                <Typography color="textSecondary" gutterBottom>
                        Recalled Vehicle Fuel Type %
                    </Typography>
                    <Paper className={classes.paper} elevation="20">
                        <Pie data={fuelChartData} options={{legend: { labels: {fontColor: 'white'}}}}/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Typography color="textSecondary" gutterBottom>
                        Most Recalled Vehicle Models
                    </Typography>
                    <Paper className={classes.paper} elevation="20" mb={3}>
                        <Bar data={modelChartData} options={chartConfig}/>
                    </Paper>
                </Grid>
            </Grid>
            <Box m={5} />
        </div>
  );
}
