import React, {useRef, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Card, ButtonGroup, Container, FormControl, Modal } from 'react-bootstrap';
import DragList from './DragList';
import 'reactjs-popup/dist/index.css';

function PipelineCard({PipelineList, pauseState, handlePipelineDrag, handleDelete, DelayAdder, run, updateSpeed, addToPipeline, reset }:{PipelineList: any[], pauseState: boolean, handlePipelineDrag: any, handleDelete: any, DelayAdder: any, run: any, updateSpeed: any, addToPipeline: any, reset: any}) {

  const [LoadState, setLoadState] = useState(false);
  const [SaveState, setSaveState] = useState(false);
  const [DelayState, setDelayState] = useState(false);
  const [SaveName, setSaveName] = useState('');
  const [DelayAmount, setDelayAmount] = useState('');
  const [DelayMinutesState, setDelayMinutesState] = useState(false);
  const [SavedLists, setSavedLists] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);


  const ToggleLoad = () => setLoadState(!LoadState);
  const ToggleSave = () => setSaveState(!SaveState);
  const ToggleDelay = () => setDelayState(!DelayState);

  console.log(SavedLists)

  const handleAnimationButtonClick = (animation: any) => {
    // Perform the action for the animation button press
    console.log(animation);

  
    // Perform desired actions using the attribute
    addToPipeline(animation.list);
  };
  


const renderAnimationButtons = () => {
  return SavedLists.map((item, index) => (
    <ButtonGroup className='btnGroup2'>
      <Button variant='outline-success' id='play-button' title ='PLAY' onClick={() => runAnimation(item)} >➤</Button>
      <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => handleAnimationButtonClick(item)} >{item.name}</Button>
      <Button variant='outline-primary' id='hide-button' title ='ADD TO PIPELINE' onClick={() => RemoveFromSavedList(index)} >X</Button>
    </ButtonGroup>
  ));
};

const runAnimation = (animation: any) => {
  var listToRun = animation.list;
  var oldList = PipelineList.concat();
  reset(listToRun);
  run();
  reset(oldList);
}

  
  
  const AddToSavedList = () => {
    if (SaveName === '') alert('Please enter a name for the sequence!');
    else {
      setSavedLists([...SavedLists, {name: SaveName, list: PipelineList}]);
      ToggleSave();
    }
  }

  const RemoveFromSavedList = (index: number) => {
    var list = SavedLists.concat();
    if (index > -1) list.splice(index, 1);
    setSavedLists(list);
  }

  const openFile = (evt: any) => {
    const fileObj = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = LOADIT;
    reader.readAsText(fileObj);
}

function LOADIT (event: any) {
	let str = event.target.result;
  let arr = JSON.parse(str)
	console.log('arr:', arr);
  setSavedLists(arr);
}



  const RenderButtonsPipeline = () => {
   if (SaveState) {
      return(
        <ButtonGroup style={{ marginLeft: 'auto' }}>
          <FormControl placeholder="Pipeline Name" onChange={(event: any) => setSaveName(event.target.value)}/>
          <Button variant="outline-success" onClick={() => AddToSavedList()}>✔</Button>
          <Button variant="outline-danger" onClick={() => ToggleSave()}>✖</Button>
        </ButtonGroup>
      );
    }
    else if (DelayState) {
      return(
        <ButtonGroup style={{ marginLeft: 'auto' }}>
          <FormControl placeholder="0" onChange={(event: any) => setDelayAmount(event.target.value)}/>
          <Button variant="outline-secondary" onClick={() => setDelayMinutesState(!DelayMinutesState)}>
						{DelayMinutesState ? 'minutes' : 'seconds'}
					</Button>
          <Button variant="outline-success" onClick={() => DelayAdder(DelayAmount, DelayMinutesState)}>✔</Button>
          <Button variant="outline-primary" onClick={() => ToggleDelay()}>↩ </Button>
        </ButtonGroup>
      );
    }
    else {
      return(
        <>
        <ButtonGroup style={{ marginLeft: 'auto' }}>
          <Button variant="outline-secondary" title="Save Pipeline" onClick={() => ToggleSave()}>💾</Button>
          <Button variant="outline-secondary" title="Add Delay" onClick={() => ToggleDelay()}>⌚</Button>
          <Button variant="outline-danger" title="Clear Pipelline" onClick={() => reset([])}>🗑</Button>
        </ButtonGroup>

        <ButtonGroup style={{ marginLeft: 'auto' }}>
        {pauseState ? <Button variant="outline-secondary" onClick={() => run()} disabled>▶</Button> : <Button variant="outline-secondary" title="Play" onClick={() => run()}>▶</Button>}
        </ButtonGroup>
        </>
      );
    }
  }

  const RenderButtonsList = () => {
    if (LoadState) {
      return(
        <div style={{ marginLeft: 'auto' }}>
        <ButtonGroup>
          <Button variant="outline-secondary" title="UPLOAD" onClick={() => inputRef.current?.click()}><img  src='upload.png'  style={{width: '30px', height: '30px'}}></img></Button>
          <input type="file" className="d-none" id="fileupload" ref={inputRef} multiple={false} accept=".json" onChange={(event: any) => openFile(event)} />
          <Button variant="outline-secondary" title="DOWNLOAD" onClick={() => onDownload()}><img  src='download.png'  style={{width: '32px', height: '32px'}}></img></Button>
          <Button variant="outline-secondary" title="RETURN" onClick={() => ToggleLoad()}>↩</Button>
        </ButtonGroup>
        </div>
      );
    }
    else {
      return(
        <>
        <ButtonGroup style={{ marginLeft: 'auto' }}>
          <Button variant="outline-secondary" title="Load/Download From Memory" onClick={() => ToggleLoad()}>🖥️</Button>
        </ButtonGroup>
        </>
      );
    }
  }
  

  const download = (content: any, fileName: any, contentType: any) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
   }
   
   const onDownload =() => {
    if (SavedLists.length == 0) window.alert('List is empty!');
    else {
    download(JSON.stringify(SavedLists), 'Animations.Json', "text/plain");
    }
   }

    return(
      <Container className='pipeline-card'>
      <Card>
        <Card.Header>
          <div style={{display: "flex", alignItems: 'center'}}>
            The Pipeline
            {RenderButtonsPipeline()}
          </div>
        </Card.Header>
        <Card.Body>
        <DragDropContext onDragEnd={handlePipelineDrag}>
          {React.createElement(DragList, { arr: PipelineList, handleDelete: handleDelete, updateSpeed: updateSpeed })}
        </DragDropContext>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <div style={{display: "flex", alignItems: 'center'}}>
            Saved Animations
          {RenderButtonsList()}
          </div>
        </Card.Header>
        <Card.Body className='robot-object'>
        <DragDropContext onDragEnd={handlePipelineDrag}> 
          {renderAnimationButtons()}
        </DragDropContext>
        </Card.Body>
      </Card>
      </Container>
    );
}

export default PipelineCard;