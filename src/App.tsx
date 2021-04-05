import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Modal, ModalBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export type AppState = {
	dayNightStatus: boolean;
	currentIPInput: string;
	currentButterClients: HttpClient[];
	show: boolean;
	labCurrentIPs: string[];
}

export class App extends React.PureComponent<{}, AppState> {



	state: AppState = {
		dayNightStatus: false,
		currentIPInput: '192.168.57.30',
		currentButterClients: [],
		show: false,
		labCurrentIPs: ['192.168.57.30', '192.168.57.32', '192.168.57.34', '192.168.56.188', '192.168.56.193', '192.168.56.206'],
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

	onToggleInstructions = () => {
		this.setState({
			show: !this.state.show
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
		const handleClose = () => this.state.show = false;
		const handleShow = () => this.state.show = true;


		return (
			<Container>
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="#home">Multi Robot Operator</Navbar.Brand>
						<Nav className="mr-auto">
							<Button variant="primary" onClick={this.onToggleInstructions}>Instructions</Button>
							<Modal show={this.state.show} onHide={!this.state.show}>
							<Modal.Header translate="false" closeButton>
								<Modal.Title>Modal heading</Modal.Title>
							</Modal.Header>
							<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={this.onToggleInstructions}>
								Close
								</Button>

							</Modal.Footer>
							</Modal>
						</Nav>
						<Form inline>
						<Button onClick={() => { document.body.classList.toggle('background-night'); this.SetDayNightStatus() }} variant="outline-info">{this.state.dayNightStatus ? 'Bright' : 'Dark'}</Button>
						</Form>
					</Navbar>

					<Navbar className='robot-search' bg="dark" variant="dark">
						<Form inline>
						<FormControl as="select" type="IPInput" placeholder="insert IP" className="mr-sm-2" value={this.state.currentIPInput} onChange={(e) => this.setIPValue(e.target.value)}>
						{this.state.labCurrentIPs.map(ip => (<option>{ip}</option>))}
						</FormControl>

						<Button variant="outline-info" onClick={() => this.onAddRobotObject(this.state.currentIPInput)}>Connect to Robot</Button>
						</Form>
					</Navbar>

					{currentButterClients !== [] ? this.renderRobotObjects() : <h2>loading..</h2>}

			</Container>
		)
	}
}

export default App;