import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Modal, ModalBody, NavDropdown, InputGroup, ButtonGroup, ListGroup, ModalTitle } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ScenarioButtons } from './components/ScenariosButtons';
import { LinkContainer } from 'react-router-bootstrap';



export type AppState = {
	dayNightStatus: boolean;
	NewIPInput: string;
	currentButterClients: HttpClient[];
	showInst: boolean;
	showNewIP: boolean;
	labCurrentIPs: string[];
	IPdeleteState: boolean[];
}

export class App extends React.PureComponent<{}, AppState> {


	state: AppState = {
		dayNightStatus: false,
		NewIPInput: '',
		currentButterClients: [],
		showInst: false,
		showNewIP: false,
		labCurrentIPs: ['192.168.57.30', '192.168.57.32', '192.168.57.34', '192.168.56.188', '192.168.56.193', '192.168.56.206'],
		IPdeleteState: [false, false, false, false, false, false],
	}

	SetDayNightStatus = () => {
		this.setState({
			dayNightStatus: !this.state.dayNightStatus
		})
	}

	onAddRobotObject = (ip: string) => {
		const currentButterClient = new HttpClient(ip);
		currentButterClient.timeout = 240;
		if (!this.state.currentButterClients.map(c => c.ip).some(c => c === ip)) {
			this.setState({
				currentButterClients: [...this.state.currentButterClients, currentButterClient],
				showNewIP: !this.state.showNewIP
			})
		}
	}

	onRemoveRobotObject = (ip: string) => {
		this.setState({
			currentButterClients: this.state.currentButterClients.filter(butterClient => butterClient.ip !== ip)
		})
	}

	onRemoveRobotIP = (ip: string) => {
		var array = [...this.state.labCurrentIPs];
		let StateArray = [...this.state.IPdeleteState];
		var index = array.indexOf(ip);
		array.splice(index, 1);
		StateArray.splice(index, 1);
		this.setState({labCurrentIPs: array});
		this.setState({IPdeleteState: StateArray});
	}

	renderButtons(ip: string) {
		let IParray = [...this.state.labCurrentIPs];
		let StateArray = [...this.state.IPdeleteState];
		let index = IParray.indexOf(ip);
		if (this.state.IPdeleteState[index]) {
			StateArray[index] = false;
			return(
				<>
				<Button variant="secondary" disabled>Are you sure you want to delete {ip}?</Button>
				<Button variant="outline-danger" onClick={() => this.setState(() => this.onRemoveRobotIP(ip))}>🗸</Button>
				<Button variant="outline-secondary" onClick={() => this.setState({IPdeleteState: StateArray})}>✗</Button>
				</>
			);
		}
		else {
			StateArray[index] = true;
			return(
				<>
				<Button variant="secondary" onClick={() => this.onAddRobotObject(ip)}>Connect to: {ip}</Button>
				<Button variant="outline-danger" onClick={() => this.setState({IPdeleteState: StateArray})}>🗑</Button>
				</>
			);
		}
	}
	
	onToggleInstructions = () => {
		this.setState({
			showInst: !this.state.showInst
		})
	}

	onToggleIPadd = () => {
		this.setState({
			showNewIP: !this.state.showNewIP,
			IPdeleteState: this.state.IPdeleteState.fill(false)
		})
	}

	NewIpADDED = () => {
		this.setState({
			labCurrentIPs: [...this.state.labCurrentIPs, this.state.NewIPInput],
			IPdeleteState: [...this.state.IPdeleteState, false],
			NewIPInput: ''
		})
	}

	handleChange = (event: { target: { value: any; }; }) => {
		this.setState({
			NewIPInput: event.target.value
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
			<Router>
			<div>
			<Router>
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="/home">Multi Robot Operator</Navbar.Brand>
						<Nav.Link href="/home" style={{ color: '#FFF' }}>Home</Nav.Link>
						<NavDropdown title="HHRRI" id="basic-nav-dropdown" style={{ color: '#FFF' }}>
							<NavDropdown.Item><Link to="/HHRRI/In-Group">In-Group</Link></NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item><Link to="/HHRRI/Out-Group">Out-Group</Link></NavDropdown.Item> 
						</NavDropdown>
					</Navbar>

					<Navbar collapseOnSelect expand="lg" className='robot-search navbar-collapse' bg="dark" variant="dark">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					
						<Form inline>
						<Button variant="outline-info" onClick={this.onToggleIPadd}>Connect to a Robot</Button>

						<Modal show={this.state.showNewIP} onHide={this.onToggleIPadd}>
							<Modal.Header translate="true">
								<Modal.Title>Robots List:</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<ListGroup>
									{this.state.labCurrentIPs.map(ip => (
										<ListGroup.Item>
											<ButtonGroup aria-label="Basic example">
											{this.renderButtons(ip)}
						    				</ButtonGroup>
										</ListGroup.Item>
									))}
								</ListGroup>
								<p></p>
								<InputGroup className="mb-3">
    								<FormControl
      									placeholder="New Robot's IP"
      									aria-label="New Robot's IP"
      									aria-describedby="basic-addon2"
									  	value={this.state.NewIPInput}
									  	onChange={this.handleChange}
    								/>
    								<Button variant="outline-secondary" id="button-addon2" onClick={this.NewIpADDED}>➕</Button>
								</InputGroup>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary"  onClick={this.onToggleIPadd}>🡆</Button>
							</Modal.Footer>
						</Modal>
						
						</Form>

						<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto" >
							<Button variant="secondary" onClick={this.onToggleInstructions}>Instructions</Button>
							<Button className="mx-2" onClick={() => { document.body.classList.toggle('background-night'); this.SetDayNightStatus() }} variant="outline-info">{this.state.dayNightStatus ? 'Bright' : 'Dark'}</Button>
							
							<Modal show={this.state.showInst} onHide={this.onToggleInstructions}>
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
						<Route path="/HHRRI/In-Group">
							<ScenarioButtons scenario="In-Group" />
						</Route>
						<Route path="/HHRRI/Out-Group">
							<ScenarioButtons scenario="Out-Group" />
						</Route>
					</Switch>

					{currentButterClients !== [] ? this.renderRobotObjects() : <h2>loading..</h2>}
			</Router>
			</div>
			</Router>
		)
	}
}

export default App;