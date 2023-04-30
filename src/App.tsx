import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RobotObject } from './components/RobotObject';
import { Navbar} from 'react-bootstrap';
import { BrowserRouter as Router} from 'react-router-dom';
import PipelineCard from './components/Pipeline/PipelineCard';
import { Commands } from './data/DogCommands';

// A timeout function for waiting between animations, in milliseconds.
function timeout(delay: number) { return new Promise(res => setTimeout(res, delay)); };

export type AppState = {PipelineItems: any[], AnimationRunning: boolean}
export class App extends React.PureComponent<{}, AppState> {
	// Declaring what the initial value of the state will be.
	state: AppState = {
		PipelineItems: [],
		AnimationRunning: false
	}

	// Creates the card holding the dog's available commands
	renderDogObject = () => {
		return (
			<ul className='robot-objects'>
				<RobotObject key='123' addToPipeline={this.addAnimationToPipeline} />
			</ul>
		);
	}

	// A handle for dragging an item in the pipeline.
	handlePipelineDrag = (droppedItem: any) => {
		if (!droppedItem.destination) return;
		var updatedList = this.state.PipelineItems.concat();
		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
		if (droppedItem.destination) {
		  updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
		}
		this.setState({ PipelineItems: updatedList });
	};

	// A handle for deleting an item in the pipeline.
	handlePipelineDelete = (index: number) => {
		var updatedList = this.state.PipelineItems.concat();
		updatedList.splice(index, 1);
		this.setState({ PipelineItems: updatedList });
	}

	// A handle for updating a field of an item in the pipeline.
	updateField = (index: number, field: string, Speed: number) => {
		var updatedList = this.state.PipelineItems.concat();
		updatedList[index][field] = Speed;
		this.setState({ PipelineItems: updatedList });
	}

	// A handle for adding an animation to the pipeline.
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

	// A handle for adding a delay to the pipeline.
  	AddDelayToPipeline = (delayAmount: string, DelayMiliState: boolean) => {
		var Amount = parseInt(delayAmount);
		var MinState = DelayMiliState ? 'seconds' : 'miliseconds';
		if (!isNaN(Amount)) {
			var Name = Amount + ' ' + MinState + ' delay';
			if (!DelayMiliState) Amount *= 1000;
			var newDelayItem = {name: Name, id: new Date().getTime().toString(), type: 'delay', amount: Amount};
			this.setState({PipelineItems: [...this.state.PipelineItems, newDelayItem]});
		}
		else alert('Please enter a valit number!');
	}

	// A handle for running the pipeline.
	runPipeline = async () => {
		this.setState({AnimationRunning: true});
		console.log("running pipeline");
		var QueuedMoves = this.state.PipelineItems.concat();
		for (var i =0; i<QueuedMoves.length; i++) {
			if (QueuedMoves[i].type === 'delay') {
				console.log("running delay: " + QueuedMoves[i].name);
				await timeout(QueuedMoves[i].amount * 1000);
			}
			else {
				console.log("running animation: " + QueuedMoves[i].name);

				var request = "http://localhost:3000/" + QueuedMoves[i].name;
				var fields = Object.keys(Commands[QueuedMoves[i].name])
				if (fields.length > 0) {
					request += '?';
					fields.forEach((field: string) => {
						request += field + '=' + QueuedMoves[i][field] + '&';
					});
					request = request.slice(0, -1);
				}
				fetch(request);

				if (QueuedMoves[i].duration > 0) await timeout(QueuedMoves[i].duration);
			}
		}

		fetch("http://localhost:3000/forward?duration=500&speed=0")
		await timeout(500);

		console.log("finished animation: " + this.state.AnimationRunning.toString());
		this.setState({AnimationRunning: false});
	}

	// A handle for resetting the pipeline with a different set of animations. 
	// Can be used to clear the pipeline by setting newPipeline to an empty array.
	resetPipeline = (newPipeline: any[]) => this.setState({PipelineItems: newPipeline});

	// A handle for adding a new set of animations to the pipeline.
	addListToPipeline = (newPipeline: any[]) => this.setState({PipelineItems: this.state.PipelineItems.concat(newPipeline)});

	// Creates the card holding the pipeline.
	renderPipeline = () => {
		return (
			<PipelineCard
				PipelineList={this.state.PipelineItems}
				handlePipelineDrag={this.handlePipelineDrag}
				handleDelete={this.handlePipelineDelete}
				DelayAdder={this.AddDelayToPipeline}
				run={this.runPipeline}
				updateField={this.updateField}
				addToPipeline={this.addListToPipeline}
				reset={this.resetPipeline}
				AnimationRunning={this.state.AnimationRunning}
			/>
		);
	}

	// Renders the app.
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
					{this.renderDogObject()}
					{this.renderPipeline()}
				</div>
			</div>
			</Router>
		)
	}
}

export default App;
