import React from 'react';
import ReactDOM from 'react-dom';
import {Button, TextInput,Select,Pane,Dialog} from 'evergreen-ui'
import './index.css';
import arrayState from "./state";
import resetArray from './generateArray';
import {subscribe} from 'jstates-react'
import {bubbleSortOriginal} from './sortAlgorithm'
import {getMergeSortAnimations} from './sortAlgorithm'
import {insertionSortOriginal} from './sortAlgorithm'
import bubbleSort from './Graph.js'

const PRIMARY = 'aqua';
const SECONDARY = '#6d6d6d'

let button = document.getElementsByClassName('setupButton');

const generateNewArray = () => {
	arrayState.setState(state => ({array: resetArray(state.numberOfBars,window.innerHeight/1.6)}))
}

function handleBarsChange(){
	let value = document.getElementById("numberOfBars")
	if (button[0].disabled === false){
		console.log(value.value)
		console.log(value.max)
		if (value.value <= value.max){
			arrayState.setState(state => ({
			array: resetArray(value.value),
			numberOfBars: value.value
		}))
		}	
	}
}

function handleTimeChange(){
	let value = document.getElementById("intervalTime").value
	if (button[0].disabled === false){
		arrayState.setState(state => ({
			intervalTime: value
		}))
	}
	console.log(value)
}

function disableButtons(button){
	for (let x = 0; x<button.length; x++){
		button[x].disabled = true;
	}
}

function enableButtons(button){
	for (let x = 0; x<button.length; x++){
		button[x].disabled = false;
	}
}



function callBubbleSort(obj){
	console.log(obj.timeInterval)
	const animations = bubbleSortOriginal(obj.array);
	disableButtons(button)
	for (let i = 0; i < animations.length; i++) {
            const arrayBar = document.getElementsByClassName('bar');

            arrayBar[animations[i][0]].style.backgroundColor = SECONDARY;
            arrayBar[animations[i][1]].style.backgroundColor = PRIMARY;

            setTimeout(() => {

                const temp = arrayBar[animations[i][1]].style.height;
                arrayBar[animations[i][1]].style.height = arrayBar[animations[i][0]].style.height;
                arrayBar[animations[i][0]].style.height = temp;

                arrayBar[animations[i][1]].style.backgroundColor = SECONDARY;
                arrayBar[animations[i][0]].style.backgroundColor = PRIMARY;
                if (i <animations.length-1){
                    if (arrayBar[animations[i][1]] !== arrayBar[animations[i+1][0]]){
                        arrayBar[animations[i][1]].style.backgroundColor = PRIMARY;
                        arrayBar[animations[i+1][0]].style.backgroundColor = SECONDARY;
                    }}

            }, i * obj.intervalTime)
        }
    setTimeout(() => {
    	enableButtons(button)
    }, animations.length * obj.intervalTime)
}

function callMergeSort(obj){
	const animations = getMergeSortAnimations(obj.array);
	disableButtons(button)
	console.log(button[0].disabled)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY : PRIMARY;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * obj.intervalTime);
        } else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * obj.intervalTime);
        }
    }
    setTimeout(() => {
    	enableButtons(button)
    }, animations.length * obj.intervalTime)
}

function callInsertionSort(obj){
    const history = insertionSortOriginal(obj.array);
    disableButtons(button)
    for (let i =0; i<history.length-1; i++){
        let arrayBars = document.getElementsByClassName('bar');

        arrayBars[history[i][0]].style.backgroundColor = SECONDARY;
        arrayBars[history[i][1]].style.backgroundColor = PRIMARY;


        setTimeout(() => {
            let temp = arrayBars[history[i][0]].style.height;
            arrayBars[history[i][0]].style.height = arrayBars[history[i][1]].style.height;
            arrayBars[history[i][1]].style.height = temp;

            arrayBars[history[i][1]].style.backgroundColor = SECONDARY;
            arrayBars[history[i][0]].style.backgroundColor = PRIMARY;
            if (i <history.length-1){
                if (arrayBars[history[i][1]] !== arrayBars[history[i+1][0]]){
                    arrayBars[history[i][1]].style.backgroundColor = PRIMARY;
                    arrayBars[history[i+1][0]].style.backgroundColor = SECONDARY;
                }}

        }, i * obj.intervalTime)
    }
    setTimeout(() => {
    	enableButtons(button)
    }, history.length * obj.intervalTime)
}


class Settings extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isShown: false,
			w: window.innerWidth
		}
		this.sort = this.sort.bind(this)
	}

	sort(obj){
		let sel = document.getElementById("selected")
		console.log(sel.value)
		if (sel.value == "bs"){
			console.log("called")
			callBubbleSort(obj);
		}
		if (sel.value == "ms"){
			console.log("called2")
			callMergeSort(obj);
		}
		if (sel.value === "is"){
			callInsertionSort(obj)
		}
	}


	render() {
		return (
            <Pane 
            	className = "popup" 
            	elevation={1} 
            	height={60} 
            	padding={10} 
            	width={400}  
            	background="tint2" 
            	alignItems = "center" 
            	display="flex"
            	justifyContent="center"
            >
            <Button appearance = "primary" marginRight = {16} className = 'setupButton' onClick = {generateNewArray}>Generate New Array</Button>
            <Dialog
            	isShown={this.state.isShown}
            	className = "setupButton"
		        title="Set-Up"
		        onCloseComplete={() => this.setState({isShown: false})}
		        confirmLabel = "Sort"
		        onConfirm = {(close) => {
		        	close();
		        	this.sort(this.props);
		        }}
		      >

            <link rel="stylesheet" href="Settings.css" />
		            <Select id="selected">
		            	<option value="bs">Bubble Sort</option>
		            	<option value="ms">Merge Sort</option>
		            	<option value="is">Insertion Sort</option>
		            </Select>
		            <TextInput max = {window.innerWidth/2} min = '2' type = "number" id = "numberOfBars" value={this.props.numberOfBars} onChange = {() => handleBarsChange()} />
		            <TextInput max = '400' min = '0' type = "number" id = "intervalTime" value={this.props.intervalTime} onChange = {() => handleTimeChange()} />
		    </Dialog>
		    <Button className = "setupButton" onClick = {() => this.setState({isShown: true})}>Setup</Button>
	        </Pane>
		)
	}
}

const mapState = arrayState => ({
	array:arrayState.array,
	numberOfBars: arrayState.numberOfBars,
	intervalTime: arrayState.intervalTime,
})


export default subscribe(Settings,arrayState,mapState);