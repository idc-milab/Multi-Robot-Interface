import React from 'react';
import './App.scss';
import { RobotObject } from './components/RobotObject';
import { Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from 'react-router-dom';
import PipelineCard from './components/Pipeline/PipelineCard';
import { Commands } from './data/DogCommands';



/*this is where we declare an object called AppState and in it all the constants \
that appear on the top of the website page 
*/

function timeout(delay: number) { return new Promise(res => setTimeout(res, delay)); }; // delay function

export type AppState = {
	dayNightStatus: boolean;
	NewIPInput: string;
	showInst: boolean;
	showNewIP: boolean;
	pauseState: boolean;
	PipelineItems: any[];
}

export class App extends React.PureComponent<{}, AppState> {


/**
 * declaring what the default values of the const. will be
 */
	state: AppState = {
		dayNightStatus: false,
		NewIPInput: '',
		showInst: false,
		showNewIP: false,
		pauseState: false,
		PipelineItems: []
	}

	renderRobotObjects = () => {
	/**this is const that enables the connect robot button on the webpage */
		return (
			<ul className='robot-objects'>
				<RobotObject key='123' addToPipeline={this.addAnimationToPipeline} />
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
	setSpeed = (index: number, field: string, Speed: number) => {
		var updatedList = this.state.PipelineItems.concat();
		updatedList[index][field] = Speed;
		this.setState({ PipelineItems: updatedList });
	}
	addAnimationToPipeline = (action: string) => {
		var newId = new Date().getTime().toString();
		var newAnimationItem: any = {
		  name: action,
		  id: newId,
		  type: "action",
		  duration: 0
		};
		Object.keys(Commands[action]).forEach((field: string) => {
		  newAnimationItem[field] = 0;
		});
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
		for (var i=0; i<QueuedMoves.length; i++) {
			console.log("running animation: " + QueuedMoves[i].name);

			var request = "http://localhost:3000/" + QueuedMoves[i].name;
			var fields = Object.keys(Commands[QueuedMoves[i].name])
			if (fields.length > 0) {
				request += '?';
				for(let j=0; i<fields.length-1; i++) {
					request += fields[j] + '=' + QueuedMoves[i][fields[j]] + '&';
				}
				request = request.slice(0, -1);
			}
			fetch(request);

			if (QueuedMoves[i].duration > 0) await timeout(QueuedMoves[i].duration);

		}
	}
	resetPipeline = (newPipeline: any[]) => this.setState({PipelineItems: newPipeline});
	addToPipeline = (newPipeline: any[]) => this.setState({PipelineItems: this.state.PipelineItems.concat(newPipeline)});
	renderPipeline = () => {
		return (
			<PipelineCard
				PipelineList={this.state.PipelineItems}
				pauseState={this.state.pauseState}
				handlePipelineDrag={this.handlePipelineDrag}
				handleDelete={this.handlePipelineDelete}
				DelayAdder={this.AddDelayToPipeline}
				run={this.runPipeline}
				updateSpeed={this.setSpeed}
				addToPipeline={this.addToPipeline}
				reset={this.resetPipeline}
			/>
		);
	}
	render() {
		return (
			<Router>
			<div>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/">🐕 Robot Dog Operator 🐕</Navbar.Brand>
				</Navbar>
				<Navbar collapseOnSelect expand="lg" className='robot-search navbar-collapse' bg="dark" variant="dark">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
