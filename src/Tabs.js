import React from 'react';
import ReactDOM from 'react-dom';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './index.css';
import Graph from './Graph'
import './bulma.css'

import CompleteWheel from './CompleteWheel'

class RTabs extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selectedIndex:1,
			tabs: ['Bar Graph','Colour Wheel'],
			functionName: [<Graph />,<CompleteWheel />]
		}
	}
	render(){
		return(
			<Tabs class = 'tabs is-centered'>
				<TabList class = "tabs">
					{this.state.tabs.map((tab,idx) => (
						<Tab class = "is-active" key = {idx} className = "button button-primary">
							{tab}
						</Tab>
					))}
				</TabList>
				<TabPanel>
					{this.state.functionName[0]}
				</TabPanel>
				<TabPanel>
					{this.state.functionName[1]}
				</TabPanel>
			</Tabs>
		)
	}
}

export default RTabs
