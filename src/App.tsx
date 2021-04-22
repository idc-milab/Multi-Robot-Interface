import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Modal, ModalBody, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ScenarioButtons } from './components/ScenariosButtons';
import { LinkContainer } from 'react-router-bootstrap';



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
		currentButterClient.timeout = 240;
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
			<Router>
			<div>
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="/home">Multi Robot Operator</Navbar.Brand>
						<Nav.Link href="/home" style={{ color: '#FFF' }}>Home</Nav.Link>
						<NavDropdown title="HHRRI" id="basic-nav-dropdown" style={{ color: '#FFF' }}>
							<NavDropdown.Item><Link to="/HHRRI/Baseline">Baseline</Link></NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item><Link to="/HHRRI/In-Group">In-Group</Link></NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item><Link to="/HHRRI/Out-Group">Out-Group</Link></NavDropdown.Item>
						</NavDropdown>
					</Navbar>

					<Navbar collapseOnSelect expand="lg" className='robot-search navbar-collapse' bg="dark" variant="dark">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					
						<Form inline>
						<FormControl as="select" type="IPInput" placeholder="insert IP" className="mr-sm-2" value={this.state.currentIPInput} onChange={(e) => this.setIPValue(e.target.value)}>
						{this.state.labCurrentIPs.map(ip => (<option>{ip}</option>))}
						</FormControl>

						<Button variant="outline-info" onClick={() => this.onAddRobotObject(this.state.currentIPInput)}>Connect to Robot</Button>
						</Form>
						<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto" >
							<Button variant="secondary" onClick={this.onToggleInstructions}>Instructions</Button>
							<Button className="mx-2" onClick={() => { document.body.classList.toggle('background-night'); this.SetDayNightStatus() }} variant="outline-info">{this.state.dayNightStatus ? 'Bright' : 'Dark'}</Button>
							
							<Modal show={this.state.show} onHide={!this.state.show}>
							<Modal.Header translate="true">
								<Modal.Title>Manual for the "Robot-Operator"</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>
								1. Make sure that your robot in connected to a ButterComposer on some laptop around the lab
								</p>
								<p>
								2. Make sure that this computer is connected to milab_idc wifi network (password: milabspirit)
								</p>
								<p>
								3. Try to remove and then add the robot card from the screen if there are no available animations buttons apeering on screen
								</p>
								4. Once you have done steps 1,2,3 - try again!

							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={this.onToggleInstructions}>
								I'm ready! go back
								</Button>

							</Modal.Footer>
							</Modal>
						</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Switch>
						<Route path="/HHRRI/Baseline">
							<ScenarioButtons scenario="Baseline" />
						</Route>
						<Route path="/HHRRI/In-Group">
						<ScenarioButtons scenario="In-Group" />
						</Route>
						<Route path="/HHRRI/Out-Group">
						<ScenarioButtons scenario="Out-Group" />
						</Route>
					</Switch>


					{currentButterClients !== [] ? this.renderRobotObjects() : <h2>loading..</h2>}

			</div>
			</Router>
		)
	}
}

export default App;