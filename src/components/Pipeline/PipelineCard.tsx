import { constants } from 'os';
import React, { useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Card, ButtonGroup, Container, FormControl } from 'react-bootstrap';
import DragList from './DragList';
import SequenceDeposit from './SequenceDeposit';

function PipelineCard({PipelineList, handlePipelineDrag, handleDelete, DelayAdder, run, reset, pauseResume, stop}:{PipelineList: any[], handlePipelineDrag: any, handleDelete: any, DelayAdder: any, run: any, reset: any, pauseResume: any, stop: any}) {

  const [LoadState, setLoadState] = useState(false);
  const [SaveState, setSaveState] = useState(false);
  const [DelayState, setDelayState] = useState(false);
  const [SaveName, setSaveName] = useState('');
  const [DelayAmount, setDelayAmount] = useState('');
  const [DelayMinutesState, setDelayMinutesState] = useState(false);
  const [SavedLists, setSavedLists] = useState<any[]>([]);

  const ToggleLoad = () => setLoadState(!LoadState);
  const ToggleSave = () => setSaveState(!SaveState);
  const ToggleDelay = () => setDelayState(!DelayState);

  const AddToSavedList = () => {
    if (SaveName === '') alert('Please enter a name for the sequence!');
    else {
      setSavedLists([...SavedLists, {name: SaveName, list: PipelineList}]);
      ToggleSave();
    }
  }

  const RemoveFromSavedList = (item: any) => {
    var list = SavedLists.concat();
    const index = list.indexOf(item);
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

  const RenderButtons = () => {
    if (LoadState) {
      return(
        <>
        <div style={{ marginLeft: 'auto' }}>
        <label className="custom-file-upload">
        <input type="file" className="hidden" id="fileupload" multiple={false} accept=".json" onChange={(event: any) => openFile(event)}/>Upload from device</label>
        </div>
        <div style={{ marginLeft: 'auto' }}>
        <ButtonGroup>
          <Button variant="outline-secondary" onClick={() => onDownload()}>💾</Button>
          <Button variant="outline-secondary" onClick={() => ToggleLoad()}>↩</Button>
        </ButtonGroup>
        </div>
        </>
      );
    }
    else if (SaveState) {
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
          <Button variant="outline-primary" onClick={() => ToggleDelay()}>↩</Button>
        </ButtonGroup>
      );
    }
    else {
      return(
        <>
        <ButtonGroup style={{ marginLeft: 'auto' }}>
          <Button variant="outline-secondary" onClick={() => ToggleSave()}>💾</Button>
          <Button variant="outline-secondary" onClick={() => ToggleLoad()}>📁</Button>
          <Button variant="secondary" onClick={() => ToggleDelay()}>➕⌚</Button>
          <Button variant="danger" onClick={() => reset([])}>🗑</Button>
        </ButtonGroup>
        <ButtonGroup style={{ marginLeft: 'auto' }}>
        
          <Button  onClick={() => pauseResume()}>⏯️</Button>
          <Button variant="danger" onClick={() => stop()}>🛑</Button>
          <Button variant="success" onClick={() => run()}>➤</Button>
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
    download(JSON.stringify(SavedLists), "Pipelines.json", "text/plain");
   }

    return(
      <Container className='pipeline-card'>
      <Card>
        <Card.Header>
          <div style={{display: "flex", alignItems: 'center'}}>
            {LoadState ? 'Saved Pipelines' : 'The Pipeline'}
            {RenderButtons()}
          </div>
        </Card.Header>
        <Card.Body>
        <DragDropContext onDragEnd={handlePipelineDrag}>
          {LoadState ? <SequenceDeposit arr={SavedLists} load={reset} toggle={() => ToggleLoad()} remove={RemoveFromSavedList}/> : <DragList name="Queue" arr={PipelineList} handleDelete={handleDelete}/>}
        </DragDropContext>
        </Card.Body>
      </Card>
      </Container>
    );
}

export default PipelineCard;