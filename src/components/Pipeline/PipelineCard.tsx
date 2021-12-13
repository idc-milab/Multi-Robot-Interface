import React, { Component, useEffect, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Card, ButtonGroup, Container, Modal, InputGroup, FormControl, Form } from 'react-bootstrap';
import DragList from './DragList';
import SequenceDeposit from './SequenceDeposit';

function PipelineCard({PipelineList, handlePipelineDrag, handleDelete, DelayAdderMode, run, reset}:{PipelineList: any[], handlePipelineDrag: any, handleDelete: any, DelayAdderMode: any, run: any, reset: any}) {

  const [LoadState, setLoadState] = useState(false);
  const [SaveState, setSaveState] = useState(false);
  const [SaveName, setSaveName] = useState('');
  const [SavedLists, setSavedLists] = useState<any[]>([]);

  const ToggleLoad = () => setLoadState(!LoadState);
  const ToggleSave = () => setSaveState(!SaveState);

  const AddToSavedList = () => {
    setSavedLists([...SavedLists, {name: SaveName, list: PipelineList}]);
    ToggleSave();
  }

  const RenderButtons = () => {
    if (LoadState) {
      return(
        <ButtonGroup style={{ marginLeft: 'auto' }}>
          <Button variant="outline-secondary" onClick={() => ToggleLoad()}>↩</Button>
        </ButtonGroup>
      );
    }
    else {
      if (SaveState) {
        return(
          <ButtonGroup style={{ marginLeft: 'auto' }}>
            <FormControl placeholder="Sequence Name" onChange={(event: any) => setSaveName(event.target.value)}/>
            <Button variant="outline-success" onClick={() => AddToSavedList()}>✔</Button>
            <Button variant="outline-danger" onClick={() => ToggleSave()}>✖</Button>
          </ButtonGroup>
        );
      }
      else {
        return(
          <ButtonGroup style={{ marginLeft: 'auto' }}>
            <Button variant="outline-secondary" onClick={() => ToggleSave()}>💾</Button>
            <Button variant="outline-secondary" onClick={() => ToggleLoad()}>📁</Button>
            <Button variant="secondary" onClick={() => DelayAdderMode()}>➕⌚</Button>
            <Button variant="danger" onClick={() => reset([])}>🗑</Button>
            <Button variant="success" onClick={() => run()}>➤</Button>
          </ButtonGroup>
        );
      }
    }
  }

    return(
      <Container className='pipeline-card'>
      <Card>
        <Card.Header>
          <div style={{display: "flex", alignItems: 'center'}}>
            The Pipeline
            {RenderButtons()}
          </div>
        </Card.Header>
        <Card.Body>
        <DragDropContext onDragEnd={handlePipelineDrag}>
          {LoadState ? <SequenceDeposit arr={SavedLists} load={reset} toggle={() => ToggleLoad()}/> : <DragList name="Queue" arr={PipelineList} handleDelete={handleDelete}/>}
        </DragDropContext>
        </Card.Body>
      </Card>
      </Container>
    );
}

export default PipelineCard;