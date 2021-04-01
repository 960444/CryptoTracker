import React, { useRef, useEffect, useState } from "react"
import Chartjs from "chart.js"
import { Typography, Grid, Button, makeStyles } from '@material-ui/core'
import CountUp from 'react-countup'

//Configure Chart Settings
const chartConfig = {
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5,
    },
    animation: {
        duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [{
            ticks: {
                fontColor: 'white',
            },
            type: "time",
            distribution: "linear",
        }],
        yAxes: [{
            ticks: {
                fontColor: 'white',
            }
        }],
    },
};

//Component Styling
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    }
 })) 

export default function Charts({data}) {
    //Initialize styling
    const classes = useStyles()

    const chartRef = useRef()
    const { day, week, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState("24h")

    //Time Format Helper Function
    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day
        }
    };

    //Populate Chart With Data
    useEffect(() => {
        if (chartRef && chartRef.current && detail) {
            const chartInstance = new Chartjs(chartRef.current, {
                type: "line",
                data: {
                    datasets: [{
                        label: `${detail.name} price`,
                        data: determineTimeFormat(),
                        backgroundColor: "#FFF44F",
                        borderColor: "#B5AB05",
                        pointRadius: 0,
                    }],
                },
                options: {
                    ...chartConfig,
                },
            })
        }
    })


    const renderPrice = () => {
        if (detail) {
            return (
                <div>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={6}>
                        <Typography variant="h6" component="h2" color="textPrimary">
                            Current Price 
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary">
                            <CountUp start={0} end={detail.current_price.toFixed(6)} duration={3} separator="," /> 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" color="textPrimary">
                            Price Change 
                        </Typography>
                        <Typography variant="h6" component="h2" style={detail.price_change_24h < 0
                            ? {color: '#FF6F61'}
                            : {color: '#88B04B'}}>
                            {detail.price_change_percentage_24h.toFixed(2)}%
                        </Typography>
                    </Grid>
                </Grid>
            </div>
          );
        }
      };
      return (
        <div>
            <div>{renderPrice()}</div>
            <div>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
            </div>
            <div>
                <Button variant="contained" color="textPrimary" onClick={() => setTimeFormat("24h")} className={classes.button}>
                    Daily
                </Button>
                <Button variant="contained" color="textPrimary" onClick={() => setTimeFormat("7d")} className={classes.button}>
                    Weekly
                </Button>
                <Button variant="contained" color="textPrimary" onClick={() => setTimeFormat("1y")} className={classes.button}>
                    Yearly
                </Button>
            </div>
        </div>
      );
    };
