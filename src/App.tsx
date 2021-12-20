import React from 'react';
import './App.scss';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { RobotObject } from './components/RobotObject';
import { Navbar, Nav, Form, FormControl, Button, Modal, NavDropdown, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ScenarioButtons } from './components/ScenariosButtons';
import Hidden from '@material-ui/core/Hidden';
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
		labCurrentIPs: ['192.168.56.227', '192.168.56.168', '192.168.56.255', '192.168.57.32', '192.168.56.254', '192.168.56.206', '192.168.57.34','192.168.56.188'],
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
				{this.state.currentButterClients.map((butterClient) => <RobotObject key={butterClient.ip} butterClient={butterClient} onRemove={this.onRemoveRobotObject} addToPipeline={this.addAnimationToPipeline} />)}
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

	addAnimationToPipeline = (Item: any, Type: string, Client: any = null) => {
		var newId = new Date().getTime().toString();
		var newAnimationItem = {name: Item, id: newId, type: Type, client: Client};
		this.setState({ PipelineItems: [...this.state.PipelineItems, newAnimationItem] });
	}

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
			if (QueuedMoves[i].type === 'animation') {
				await QueuedMoves[i].client.playAnimation(QueuedMoves[i].name.trim(), true);
			}
			else if (QueuedMoves[i].type === 'delay') {
				await timeout(1000 * QueuedMoves[i].amount);
			}
			else alert('Problem with pipeline items!');
		}
	};

	resetPipeline = (newPipeline: any[]) => this.setState({PipelineItems: newPipeline});
	renderPipeline = () => {
		return (
			<PipelineCard
				PipelineList={this.state.PipelineItems}
				handlePipelineDrag={this.handlePipelineDrag}
				handleDelete={this.handlePipelineDelete}
				DelayAdder={this.AddDelayToPipeline}
				run={this.runPipeline}
				reset={this.resetPipeline}
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

					<Hidden smDown>
						<div className="main-grid">
							{currentButterClients !== [] ? this.renderRobotObjects() : <h2>loading..</h2>}
							{this.renderPipeline()}
						</div>
      				</Hidden>

					<Hidden mdUp>
						<Accordion>
							<Card>
								<Card.Header>
									<Nav fill variant="tabs" defaultActiveKey="1">
										<Nav.Item>
											<Nav.Link eventKey="0">Connected Robots</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="1">Pipeline</Nav.Link>
										</Nav.Item>
									</Nav>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										{currentButterClients !== [] ? this.renderRobotObjects() : <h2>loading..</h2>}
									</Card.Body>
								</Accordion.Collapse>
							</Card>
							<Card>
								<Accordion.Collapse eventKey="1">
									<Card.Body>
										{this.renderPipeline()}
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					</Hidden>

			</div>
			</Router>
		)
	}
}

export default App;
