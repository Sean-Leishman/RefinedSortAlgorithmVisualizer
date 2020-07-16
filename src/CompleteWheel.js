import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {bubblesortoriginal} from "./sortAlgorithmWheel";
import {Button, TextInput,Select,Pane,Dialog} from 'evergreen-ui'
import './Wheel.css'

const SECONDARY = '#000000'

const button = document.getElementsByClassName('turnOffButton')

function disableButtons(button){
	console.log(button)
	for (let x = 0; x<button.length; x++){
		console.log(button[x].disabled)
		button[x].disabled = true;
		console.log(button[x].disabled)
	}
}

function enableButtons(button){
	for (let x = 0; x<button.length; x++){
		button[x].disabled = false;
	}
}

class CompleteWheel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tupleArray : [],
			indexArray: [],
			NUMBER_BARS : 307,
			ANIMATION_SPEED_MS : 1,
			angle: 360,
			margin: 1,
			width:6,
			backgroundColor:'#ff0000',
			x : 150,
			y : 75,
			radius: 75,
		}
		this.myCanvas = React.createRef()
		this.dpi = window.devicePixelRatio
		this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount() {
		this.resetAllArrays();
		this.state.tupleArray.map((value,idx) => (
                    		this.drawSegment(value,idx)
                    		))
		console.log(this.state.tupleArray.length)
		const arrayBar = document.getElementsByClassName('segment');
		console.log(arrayBar.length)
	}
	// When class is loaded on webpage
	componentWillMount() {
		console.log("Reset");
		this.resetAllArrays();
	}

	// Initliaze the array to be sorted
	resetAllArrays(){
		let tupleArray = this.reset2DArray();
		let indexArray = this.resetIndexArray();

		shuffle(tupleArray,indexArray);
		console.log(this.state)
		
		this.setState({tupleArray});
		this.setState({indexArray})

		this.state.tupleArray.map((value,idx) => (
                    		this.drawSegment(value,idx)
                    		))
	}

	reset2DArray(){
		let array = [[0,0,0]*this.state.NUMBER_BARS];
		let increaseIndex = 1;
		let decreaseIndex = 0;
		array[0] = [255,0,0];
		
		let temp = [];

		while (array.length < this.state.NUMBER_BARS){
			while (array[array.length-1][increaseIndex] < 255){
				temp = array[array.length-1].map(x => x);
				temp[increaseIndex] += 5;
				array.push(temp);
			}
			increaseIndex += 1;
			while (array[array.length-1][decreaseIndex] > 0){
				temp = array[array.length-1].map(x => x);
				temp[decreaseIndex] -= 5;
				array.push(temp);
			}
			decreaseIndex += 1;

			if (increaseIndex > 2){
				increaseIndex = 0;
			}
		}
		array = array.map(x => getHex(x[0],x[1],x[2]));
		return array;
	}
	
	resetIndexArray(){
		let indexes = [];
		for (let i=0; i<this.state.NUMBER_BARS; i++){
			indexes.push(i);
		}
		return indexes;
	}

	bubbleSort() {
		disableButtons(button);
        const history = bubblesortoriginal(this.state.indexArray);
        const arrayBar = document.getElementsByClassName('segment');
        let temp = arrayBar[history[0][0]].style.backgroundColor;
        let colour = arrayBar[history[1][0]].style.backgroundColor
        for (let i = 0; i < history.length; i++) {
        	setTimeout(() => {
	        	temp = arrayBar[history[i][1]].style.backgroundColor
	        	arrayBar[history[i][0]].style.backgroundColor = arrayBar[history[i][1]].style.backgroundColor
	        	arrayBar[history[i][1]].style.backgroundColor = SECONDARY;
	            	if (i+1 < history.length){
	            		if (history[i][1] !== history[i+1][0]){
	            			arrayBar[history[i][0]].style.backgroundColor = temp;
	            			arrayBar[history[i][1]].style.backgroundColor = colour
		        			colour = arrayBar[history[i+1][0]].style.backgroundColor
	            	}
	            	}
	            	else{
	            		arrayBar[history[i][0]].style.backgroundColor = temp;
	            		arrayBar[history[i][1]].style.backgroundColor = colour
	            	}
	                this.drawSegment(arrayBar[history[i][0]].style.backgroundColor,history[i][0])
	                this.drawSegment(arrayBar[history[i][1]].style.backgroundColor,history[i][1])
        	}, i * this.state.ANIMATION_SPEED_MS)

        }
         setTimeout(() => {
    	enableButtons(button)
    }, history.length * this.state.ANIMATION_SPEED_MS)
       }
    fixDPI(){
    	console.log('RUN')
    	let canvas = document.getElementById("canvas");
    	let ctx = canvas.getContext("2d");
    	
    	let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    	console.log(style_height)
		//get CSS width
		let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
		//scale the canvas
		canvas.setAttribute('height', style_height * this.dpi);
		canvas.setAttribute('width', style_width * this.dpi);
    }

    drawSegment(value,idx){  	
    	const ctx = this.myCanvas.current.getContext("2d")
    	var startAngle = idx * 2 * Math.PI / this.state.NUMBER_BARS;
    	var endAngle = (idx+1) * 2 * Math.PI / this.state.NUMBER_BARS;
    	var x = this.state.x;
    	var y = this.state.y;
    	var radius = this.state.radius;

    	//this.fixDPI();

    	ctx.beginPath();
    	ctx.arc(x,y,radius,startAngle,endAngle,false);
    	ctx.lineTo(this.state.x,this.state.y);
    	ctx.closePath();
    	ctx.fillStyle = value;
    	ctx.fill();
    }

    sort(){
    	let sel = document.getElementById('selected')
    	if (sel.value === "bs"){
    		this.bubbleSort()
    	}
    }

    handleChange(){
    	let value = document.getElementById("intervalWheelTime").value
    	this.setState({ANIMATION_SPEED_MS:value})
    }

	render(){
		const {tupleArray} = this.state;
		return(
			<div>
			<div class="container">
               <canvas id="canvas" style = {{}}ref = {this.myCanvas} />
            </div>
                    <div className="colour-container">
                        {tupleArray.map((value,idx) => (
                             <div
                                className='segment'
                                key  = {idx}
                                style = {{
                                    height:`20px`,
                                    width: '2px',
                                    backgroundColor: value,
                                    margin: `0  ${this.state.margin}px`,
                                }}/>
                        ))}            
                    
            </div>
            <Pane className = "popup"
            	className = "popup" 
            	elevation={1} 
            	height={60} 
            	padding={10} 
            	width={400}  
            	background="tint2" 
            	alignItems = "center" 
            	display="flex"
            	justifyContent="center">
			<p>{this.state.numberOfBars}</p>
            <Button marginRight = {16} appearance = "primary" className = 'turnOffButton' onClick = {() => this.resetAllArrays()}>Generate New Array</Button>
            <Dialog
            	isShown={this.state.isShown}
		        title="Set-Up"
		        onCloseComplete={() => this.setState({isShown: false})}
		        confirmLabel = "Sort"
		        onConfirm = {(close) => {
		        	close();
		        	this.sort();
		        }}
		      >

            <link rel="stylesheet" href="Settings.css" />
		            <Select id="selected">
		            	<option value="bs">Bubble Sort</option>
		            	<option value="ms">Merge Sort</option>
		            	<option value="is">Insertion Sort</option>
		            </Select>
		            <TextInput max = '400' min = '0' type = "number" id = "intervalWheelTime" onChange = {() => this.handleChange()} value={this.state.ANIMATION_SPEED_MS} />
		    </Dialog>
		    <Button className = "turnOffButton" onClick = {() => this.setState({isShown: true})}>Setup</Button>
	        </Pane>
            </div>
			)
	}
}

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

function getHex(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return '#'+red+green+blue;
};

function shuffle(array1,array2){
	for (let i = array1.length - 1; i > 0; i--){
	  const j = Math.floor(Math.random() * i);
	  const temp1 = array1[i];
	  const temp2 = array2[i];

	  array1[i] = array1[j];
	  array2[i] = array2[j];
	  
	  array1[j] = temp1;
	  array2[j] = temp2;
	}
	return array1,array2;
}


export default CompleteWheel