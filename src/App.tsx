import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Modal, ModalBody, NavDropdown, Card, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ScenarioButtons } from './components/ScenariosButtons';
import { LinkContainer } from 'react-router-bootstrap';
import PipelineCard from './components/Pipeline/PipelineCard';


/*this is where we declare an object called AppState and in it all the constants \
that appear on the top of the website page 
*/

function timeout(delay: number) { return new Promise(res => setTimeout(res, delay)); }; // delay function

export type AppState = {
	dayNightStatus: boolean;
	currentIPInput: string;
	currentButterClients: HttpClient[]; //import all the clients from butter
	show: boolean;
	labCurrentIPs: string[]; //array of ip's
	PipelineItems: any[];
	delayAmount: string;
	DelayMinutesState: boolean;
	AdderMode: boolean;
}

export class App extends React.PureComponent<{}, AppState> {


/**
 * declaring what the default values of the const. will be
 */
	state: AppState = {
		dayNightStatus: false,
		currentIPInput: '192.168.56.227',
		currentButterClients: [],
		show: false,
		//why do we need the correct ip names and not any name for example why not have it as kip?
		labCurrentIPs: ['192.168.56.227', '192.168.56.168', '192.168.56.255', '192.168.57.32', '192.168.56.254', '192.168.56.206', '192.168.57.34'],
		PipelineItems: [],
		delayAmount: '',
		DelayMinutesState: false,
		AdderMode: false,
	}
	/**declaring the function of set nightstatus to be false. notice the setState command
	 * re-renders the pervious AppState command
	  */

	SetDayNightStatus = () => {
		this.setState({
			dayNightStatus: !this.state.dayNightStatus
		})
	}

/**declaring what the current ip will be setState command re-renders the previous command */
	setIPValue = (ip: string) => {
		this.setState({
			currentIPInput: ip
		})
	}

	/**adding robot objects to the ip array */
	onAddRobotObject = (ip: string) => {
		const currentButterClient = new HttpClient(ip);
		currentButterClient.timeout = 240;
		if (!this.state.currentButterClients.map(c => c.ip).some(c => c === ip)) {
			this.setState({
				currentButterClients: [...this.state.currentButterClients, currentButterClient]
			})
		}
	}

	/**this function will be used when we want to remove a robot object from the the screen */
	onRemoveRobotObject = (ip: string) => {
		this.setState({
			currentButterClients: this.state.currentButterClients.filter(butterClient => butterClient.ip !== ip)
		})
	}

	/**this is the state of the toggle instructions button on the webpage */
	onToggleInstructions = () => {
		this.setState({
			show: !this.state.show
		})
	}


	renderRobotObjects = () => {
/**this is const that enables the connect robot button on the webpage */
		return (
			<ul className='robot-objects'>
				{this.state.currentButterClients.map((butterClient) => <RobotObject key={butterClient.ip} butterClient={butterClient} onRemove={this.onRemoveRobotObject} addToPipeline={this.addItemToPipeline} />)}
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

	addItemToPipeline = (Item: any, Type: string, Client: any = null) => {
		var updatedList = this.state.PipelineItems.concat();
		var newId = new Date().getTime().toString();
		if (Type === 'animation') {
		  updatedList = updatedList.concat({name: Item, id: newId, type: Type, client: Client});
		}
		if (Type === 'delay') {
		  updatedList = updatedList.concat({name: 'delay duration', id: newId, type: Type});
		}
		if (Type === 'script') {
		  updatedList = updatedList.concat({name: 'script name', id: newId, type: Type});
		}
		this.setState({ PipelineItems: updatedList });
	}

	AddDelayToPipeline = () => {
		var Amount = parseInt(this.state.delayAmount);
		if (!isNaN(Amount)) {
		  var TempQueue = this.state.PipelineItems.concat();
		  var Name =  '' + Amount;
		  if (this.state.DelayMinutesState) Name += ' minutes delay';
		  else Name += ' seconds delay';
		  TempQueue = TempQueue.concat({name: Name, id: new Date().getTime().toString(), type: 'delay', minutes: this.state.DelayMinutesState, amount: Amount});
		  this.setState({
			PipelineItems: TempQueue,
			AdderMode: !this.state.AdderMode
		})
		}
		else alert('Please enter a valit number!');
	  }
	onToggleDelayAdder = () => {
		this.setState({
			AdderMode: !this.state.AdderMode
		});
	}

	runPipeline = async () => {
		var QueuedMoves = this.state.PipelineItems.concat();
		for (var i =0; i<QueuedMoves.length; i++) {
		  if (QueuedMoves[i].type === 'animation') {
			QueuedMoves[i].client.playAnimation(QueuedMoves[i].name.trim(), true);
		  }
		  else if (QueuedMoves[i].type === 'delay') {
			if (QueuedMoves[i].minutes) await timeout(60000 * QueuedMoves[i].amount);
			else await timeout(1000 * QueuedMoves[i].amount);
		 }
		 else alert('Problem with pipeline items!');
		}
	  };


	render() {

		const { currentButterClients } = this.state;

		return (
			<Router>
			<div>
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
						<Route path="/HHRRI/In-Group">
							<ScenarioButtons scenario="In-Group" />
						</Route>
						<Route path="/HHRRI/Out-Group">
							<ScenarioButtons scenario="Out-Group" />
						</Route>
					</Switch>

					<div className='robot-card' style={{ display: "flex" }}>
						{currentButterClients !== [] ? this.renderRobotObjects() : <h2>loading..</h2>}
						<PipelineCard PipelineList={this.state.PipelineItems} handlePipelineDrag={this.handlePipelineDrag} handleDelete={this.handlePipelineDelete} DelayAdderMode={this.onToggleDelayAdder} run={this.runPipeline}/>
					</div>

					<Modal size="sm" show={this.state.AdderMode} onHide={this.onToggleDelayAdder} centered>
        				<Modal.Header translate="true" closeButton>
          					<Modal.Title>
            					Delay properties:
          					</Modal.Title>
        				</Modal.Header>
        				<Modal.Body>
          					<InputGroup className="mb-3">
            					<FormControl placeholder="0" onChange={(event: any) => this.setState({ delayAmount: event.target.value })}/>
            					<Button variant="outline-secondary" onClick={() => this.setState({ DelayMinutesState: !this.state.DelayMinutesState })}>{this.state.DelayMinutesState ? 'minutes' : 'seconds'}</Button>
            					<Button variant="outline-secondary" onClick={() => this.AddDelayToPipeline()}>Add</Button>
          					</InputGroup>
        				</Modal.Body>
      				</Modal>

			</div>
			</Router>
		)
	}
}

export default App;