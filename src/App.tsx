import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject }  from './components/RobotObject'
import { useState } from 'react';


export type AppState = {
	dayNightStatus: boolean;
	currentIPInput: string;
	currentButterClients: HttpClient[];
}

export class App extends React.PureComponent<{}, AppState> {



	state: AppState = {
		dayNightStatus: false,
		currentIPInput: '',
		currentButterClients: [],
	}	

	SetDayNightStatus = () => {
		this.setState({
			dayNightStatus: !this.state.dayNightStatus
		})
	}


	setIPValue = (ip: string) => {
		this.setState({
			currentIPInput: ip
		})
	}

	onAddRobotObject = (ip: string) => {
		const currentButterClient = new HttpClient(ip);
		if (!this.state.currentButterClients.includes(currentButterClient)) {
			this.setState({
				currentButterClients: [...this.state.currentButterClients, currentButterClient]
			})
		}
	}

	onRemoveRobotObject = (ip: string) => {
		this.setState({
			currentButterClients: this.state.currentButterClients.filter(butterClient => butterClient.ip !== ip)
		})
	}
	
	renderRobotObjects = () => {
		
	return (
		<ul className='robot-objects'>
			{this.state.currentButterClients.map((butterClient) => <RobotObject key={butterClient.ip} butterClient={butterClient} onRemove={this.onRemoveRobotObject} />)}
		</ul>
	);


	}


	render() {

		const { currentButterClients } = this.state;

		return (

			<main>
				<span className='top-font-sizes'>
					<button onClick={() => { document.body.classList.toggle('background-night'); this.SetDayNightStatus() }}> {this.state.dayNightStatus ? 'Bright' : 'Dark'}</button>
				</span>

				<h1>Robots List</h1>
				<div>
					<input type="IPInput" placeholder="insert IP" value={this.state.currentIPInput} onChange={(e) => this.setIPValue(e.target.value)}/>
					<button onClick={() => this.onAddRobotObject(this.state.currentIPInput)}>connect</button>
				</div>
				{currentButterClients !== [] ? this.renderRobotObjects() : <h2>Loading..</h2>}

			</main>
		)
	}
}

export default App;