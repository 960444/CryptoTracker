
import React from 'react'
import { Card, Typography, Grid, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup'
import AutorenewRoundedIcon from '@material-ui/icons/AutorenewRounded'
import ClearIcon from '@material-ui/icons/Clear'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import DriveEtaIcon from '@material-ui/icons/DriveEta';

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
        margin: theme.spacing(5),
        borderRadius: '10px',
        borderBottom: '10px solid #e4e7e9'
    },
})) 

export default function Cards() {
    const classes = useStyles()

  return (
    <div className={classes.root}>
    <Grid container direction="row" justify="center" alignItems="center" >
        <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={20}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <AutorenewRoundedIcon /> Total Recalls     
                    </Typography>
                    <Typography variant="h5" component="h2" style={{color: '#88B04B'}}>
                        <CountUp start={0} end={6798} duration={2.75} separator="," />
                    </Typography>
                    <Typography variant="body2" component="p">
                        As of 15:44, 12th Feb 2020.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}  md={3}>
            <Card className={classes.card} elevation={20}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <LocalHospitalIcon/> Total Injuries   
                    </Typography>
                    <Typography variant="h5" component="h2" style={{color: '#EFC050'}}>
                        <CountUp start={0} end={356} duration={2.75} separator="," />
                    </Typography>
                    <Typography variant="body2" component="p">
                        As of 15:44, 12th Feb 2020.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={20}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <ClearIcon /> Total Fatailities
                    </Typography>
                    <Typography variant="h5" component="h2" style={{color: '#FF6F61'}}>
                        <CountUp start={0} end={37} duration={2.75} separator="," />
                    </Typography>
                    <Typography variant="body2" component="p">
                        As of 15:44, 12th Feb 2020.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={3}>
            <Card className={classes.card} elevation={20}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <DriveEtaIcon/> Top Recalled Model
                    </Typography>
                    <Typography variant="h5" component="h2" style={{color: '#9B2335'}}>
                        Toyota Prius
                    </Typography>
                    <Typography variant="body2" component="p">
                        As of 15:44, 12th Feb 2020.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </div>
  );
}