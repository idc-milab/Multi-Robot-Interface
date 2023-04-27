import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { Navbar, Nav, Form, FormControl, Button, Modal, NavDropdown, Card, ListGroup, ButtonGroup, InputGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PipelineCard from './components/Pipeline/PipelineCard';
import * as http from 'http'


/*this is where we declare an object called AppState and in it all the constants \
that appear on the top of the website page 
*/

function timeout(delay: number) { return new Promise(res => setTimeout(res, delay)); }; // delay function

export type AppState = {
	dayNightStatus: boolean;
	NewIPInput: string;
	currentButterClients: HttpClient[];
	showInst: boolean;
	showNewIP: boolean;
	pauseState: boolean;
	labCurrentIPs: string[];
	IPdeleteState: boolean[];
	PipelineItems: any[];
}

export class App extends React.PureComponent<{}, AppState> {


/**
 * declaring what the default values of the const. will be
 */
	state: AppState = {
		dayNightStatus: false,
		NewIPInput: '',
		currentButterClients: [],
		showInst: false,
		showNewIP: false,
		pauseState: false,
		labCurrentIPs: ['192.168.56.227', '192.168.56.168', '192.168.56.255', '192.168.57.32', '192.168.56.254', '192.168.56.206', '192.168.57.34','192.168.56.188'],
		IPdeleteState: Array(6).fill(false),
		PipelineItems: []
	}
	/**declaring the function of set nightstatus to be false. notice the setState command
	 * re-renders the pervious AppState command
	  */

	SetDayNightStatus = () => {
		this.setState({
			dayNightStatus: !this.state.dayNightStatus
		})
	}

	/**adding robot objects to the ip array */
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

	/**this function will be used when we want to remove a robot object from the the screen */
	onRemoveRobotObject = (ip: string) => {
		this.setState({
			currentButterClients: this.state.currentButterClients.filter(butterClient => butterClient.ip !== ip)
		})
	}

	refreshRobotObject = async (ip: string) => {
		const currentButterClient = new HttpClient(ip);
		currentButterClient.timeout = 240;
		this.setState({
			currentButterClients: this.state.currentButterClients.filter(butterClient => butterClient.ip !== ip)
		});
		await timeout(200);
		this.setState({
			currentButterClients: [...this.state.currentButterClients, currentButterClient],
		});
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
				<Button variant="secondary" disabled>Delete {ip}?</Button>
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

	/**this is the state of the toggle instructions button on the webpage */
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
		const pattern = /^[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+$/g;
		const result = pattern.test(this.state.NewIPInput);
		let index = this.state.labCurrentIPs.indexOf(this.state.NewIPInput);
		if (result) {
			if (index === -1) {
				this.setState({
					labCurrentIPs: [...this.state.labCurrentIPs, this.state.NewIPInput],
					IPdeleteState: [...this.state.IPdeleteState, false]
				});
			}
			this.setState({
				NewIPInput: ''
			});
		}
		else {
			alert('Incorrect Input');
		}
	}

	handleChange = (event: { target: { value: any; }; }) => {
		this.setState({
			NewIPInput: event.target.value
		})
	}

	handlePress = (event: { key: string; }) => {
		if (event.key === 'Enter') {
			this.NewIpADDED();
		}
	}

	renderRobotObjects = () => {
	/**this is const that enables the connect robot button on the webpage */
		return (
			<ul className='robot-objects'>
				{/* {this.state.currentButterClients.map((butterClient) => <RobotObject key={butterClient.ip} butterClient={butterClient} onRemove={this.onRemoveRobotObject} refresh={this.refreshRobotObject} addToPipeline={this.addAnimationToPipeline} />)} */}
				<RobotObject key='123' onRemove={this.onRemoveRobotObject} refresh={this.refreshRobotObject} addToPipeline={this.addAnimationToPipeline} />
			</ul>
		);
	}

	handlePipelineDrag = (droppedItem: any) => {
		if (!droppedItem.destination) return;
		var updatedList = this.state.PipelineItems.concat();
		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
		if (droppedItem.destination) {
		  updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
		}
		this.setState({ PipelineItems: updatedList });
	};
	
	handlePipelineDelete = (index: number) => {
		var updatedList = this.state.PipelineItems.concat();
		updatedList.splice(index, 1);
		this.setState({ PipelineItems: updatedList });
	}

	addAnimationToPipeline = (action: string, type: string, speed: number, time: number) => {
		var newId = new Date().getTime().toString();
		var newAnimationItem = {
		  name: action,
		  id: newId,
		  type: type,
		  speed: speed,
		  time: time,
		};
		this.setState({ PipelineItems: [...this.state.PipelineItems, newAnimationItem] });
	  };
	  

	AddDelayToPipeline = (delayAmount: string, DelayMinutesState: boolean) => {
		var Amount = parseInt(delayAmount);
		var MinState = DelayMinutesState ? 'minutes' : 'seconds';
		if (!isNaN(Amount)) {
			var Name = Amount + ' ' + MinState + ' delay';
			if (DelayMinutesState) Amount *= 60;
			var newDelayItem = {name: Name, id: new Date().getTime().toString(), type: 'delay', amount: Amount};
			this.setState({PipelineItems: [...this.state.PipelineItems, newDelayItem]});
		}
		else alert('Please enter a valit number!');
	}

	runPipeline = async () => {
		

	
		var QueuedMoves = this.state.PipelineItems.concat();
		for (var i =0; i<QueuedMoves.length; i++) {
			console.log("running animation: " + QueuedMoves[i].name);
			fetch('http://localhost:3000/' + QueuedMoves[i].name + '?speed=0.25&duration=2000')
			await timeout(2000);
		}
	};

	PauseResumePipeline =  () => {
		var connectdRobots = this.state.currentButterClients;
		for (var i =0; i<connectdRobots.length; i++) {
			if (!this.state.pauseState) connectdRobots[i].pauseAnimation();
			else connectdRobots[i].resumeAnimation();
		}
		this.setState({pauseState: !this.state.pauseState});
	};


	StopPipeline =  () => {
		var connectdRobots = this.state.currentButterClients;
		for (var i =0; i<connectdRobots.length; i++) {
			connectdRobots[i].stopAnimation();
			connectdRobots[i].clearAnimation();
		}
		this.setState({pauseState: false});
	};
	

	resetPipeline = (newPipeline: any[]) => this.setState({PipelineItems: newPipeline});
	renderPipeline = () => {
		return (
			<PipelineCard
				PipelineList={this.state.PipelineItems}
				pauseState={this.state.pauseState}
				handlePipelineDrag={this.handlePipelineDrag}
				handleDelete={this.handlePipelineDelete}
				DelayAdder={this.AddDelayToPipeline}
				run={this.runPipeline}
				reset={this.resetPipeline}
				pauseResume={this.PauseResumePipeline}
				stop={this.StopPipeline}
			/>
		);
	}


	render() {

		const { currentButterClients } = this.state;

		return (
			<Router>
			<div>
					<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="/home">Multi Robot Operator</Navbar.Brand>
						
					</Navbar>

					<Navbar collapseOnSelect expand="lg" className='robot-search navbar-collapse' bg="dark" variant="dark">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					
						<Form>
						<Button variant="outline-info" onClick={this.onToggleIPadd}>Connect to a Robot</Button>

						<Modal show={this.state.showNewIP} onHide={this.onToggleIPadd}>
							<Modal.Header translate="yes">
								<Modal.Title>Robots List:</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<ListGroup className='navbar-brand'>
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
										onKeyPress={this.handlePress}
    								/>
    								<Button variant="outline-secondary" id="button-addon2" onClick={this.NewIpADDED}>Add</Button>
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
								<Modal.Header translate="yes">
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

					<div className="main-grid">
						{this.renderRobotObjects()}
						{this.renderPipeline()}
					</div>

			</div>
			</Router>
		)
	}
}

export default App;
