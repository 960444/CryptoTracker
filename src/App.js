
import React from 'react'
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cards from './Components/Cards.js'
import Charts from './Components/Charts.js'


const useStyles = makeStyles((theme) => ({
  
  body: {
    backgroundColor: '#e0e0e0',
  },  
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(90deg, #1F436D 30%, #B51383 90%)',
    color: '#fcfcfc'
  },




})) 


export default function App() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Cards />
      <Charts />
    </div>
  );
}


