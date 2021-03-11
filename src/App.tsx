import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject }  from './components/RobotObject'
import { useState } from 'react';


export type AppState = {
	search: string;
	hiddenTicketsId: string[];
	dayNightStatus: boolean;
	currentIPInput: string;
	currentButterClients: HttpClient[];
}

export class App extends React.PureComponent<{}, AppState> {



	state: AppState = {
		search: '',
		hiddenTicketsId: [],
		dayNightStatus: false,
		currentIPInput: '',
		currentButterClients: [],
	}

	searchDebounce: any = null;

	// async componentDidMount() {
	// 	this.setState({
	// 		tickets: await api.getTickets(this.state.page, this.state.sortBy, ''),
	// 		lastPageIndex: await api.getLastPageIndex()
	// 	});
	// }


	// onHideTicket = (id: string) => {
	// 	this.setState({
	// 		hiddenTicketsId: [...this.state.hiddenTicketsId, id]
	// 	});
	// }

	// onRestoreTicket = () => {
	// 	this.setState({
	// 		hiddenTicketsId: []
	// 	});
	// }
	

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
		this.setState({
			currentButterClients: [...this.state.currentButterClients, currentButterClient]
		})
	}

	// loadAnimations = async () => {
    //     this.state.butterClient.getAvailableAnimations().then(res => {
    //       this.state.animations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(' ', '').split(',');
    //     });
    //     this.setState({animations : ["a" , "f"]});
    //     console.log(this.state.animations)
    //     this.animationsButtons = this.state.animations.map(animation => 
    //         <button onClick={(_e)=>this.playAnimationByName(animation)}>play {animation}</button>);
	// }
	
	renderRobotObjects = () => {
		
	return (
		<ul className='robot-objects'>
			{this.state.currentButterClients.map((butterClient) => <RobotObject key={butterClient.ip} butterClient={butterClient}/>)}
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