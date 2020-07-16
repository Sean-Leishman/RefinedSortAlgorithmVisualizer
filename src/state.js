import React from 'react'
import {createState,subscribe} from 'jstates-react'
import resetArray from './generateArray'

let NUMBER_OF_BARS = 310;
let INTERVAL_TIME = 10;

const arrayState = createState({
	array:resetArray(NUMBER_OF_BARS,window.innerHeight/1.6),
	isRunning: '',
	sortMethod: '',
	numberOfBars: NUMBER_OF_BARS,
	intervalTime: INTERVAL_TIME,
	maxHeight: window.innerHeight/1.6
});

export default arrayState;