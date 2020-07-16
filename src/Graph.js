import React from 'react';
import ReactDOM from 'react-dom';
import './Graph.css';
import arrayState from "./state";
import {createState,subscribe} from 'jstates-react'
import Settings from './Settings'

const PRIMARY = 'aqua';
const SECONDARY = '#6d6d6d'

const mapStatesToProps = (arrayState,mapState) => ({
	array: arrayState.array,
	numberOfBars: arrayState.numberOfBars,
})

export class Graph extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			width: window.innerWidth
		}
		this.updateDimensions=this.updateDimensions.bind(this)
	}
	componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  	}	

  	updateDimensions(){
  		let sel = document.getElementsByClassName('setupButton')
  		console.log(sel)
  		if (!sel[0].disabled){
  			console.log("called")
			this.setState({width:window.innerWidth})
  		}
  	}

	render() {
		return (
            <div className="bar-container">
	            {this.props.array.map((value,idx) => (
					<div
					className="bar"
					key  = {idx}
					style = {{
					    height:`${value}px`,
					    backgroundColor: PRIMARY,
					    width: `${window.innerWidth/(2.2*this.props.numberOfBars)}px`,
					    margin: `${window.innerWidth/(4.2*this.props.numberOfBars)}px`,
					}}/>

               ))}
	           <Settings />
	        </div>
		)
	}
}

const mapState = arrayState => ({
	array:arrayState.array,
	numberOfBars: arrayState.numberOfBars,
})

export default subscribe(Graph,arrayState,mapState,mapStatesToProps);

