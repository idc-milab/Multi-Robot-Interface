import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export type AppState = {
	dayNightStatus: boolean;
	currentIPInput: string;
	currentButterClients: HttpClient[];
}

export class App extends React.PureComponent<{}, AppState> {



	state: AppState = {
		dayNightStatus: false,
		currentIPInput: '192.168.57.30',
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
		currentButterClient.timeout = 120;
		if (!this.state.currentButterClients.map(c => c.ip).some(c => c === ip)) {
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
			<Container>
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="#home">Multi Robot Operator</Navbar.Brand>
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#manual">Manual</Nav.Link>
						</Nav>
						<Form inline>
						<Button onClick={() => { document.body.classList.toggle('background-night'); this.SetDayNightStatus() }} variant="outline-info">{this.state.dayNightStatus ? 'Bright' : 'Dark'}</Button>
						</Form>
					</Navbar>

					<Navbar className='robot-search' bg="dark" variant="dark">
						<Form inline>
						<FormControl type="IPInput" placeholder="insert IP" className="mr-sm-2" value={this.state.currentIPInput} onChange={(e) => this.setIPValue(e.target.value)}/>
						<Button variant="outline-info" onClick={() => this.onAddRobotObject(this.state.currentIPInput)}>Connect to Robot</Button>
						</Form>
					</Navbar>

					{currentButterClients !== [] ? this.renderRobotObjects() : <h2>Loading..</h2>}

			</Container>
		)
	}
}

export default App;