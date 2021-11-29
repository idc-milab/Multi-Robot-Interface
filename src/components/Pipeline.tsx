import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ButtonGroup, ButtonToolbar, Dropdown, InputGroup, SplitButton, FormControl, Modal } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Switch from "react-switch";

function Pipeline(this: any, {animationsList, butterclient}: {animationsList:string[], butterclient: HttpClient})  {

  const [QueuedMoves, setQueuedMoves] = useState(Array(0).fill(null));
  const [AnimationDelay, setAnimationDelay] = useState('');
  const [PipelineMode, setPipelineMode] = useState(false);
  const [DelayAdderMode, setDelayAdderMode] = useState(false);
  const [DelayMinutes, setDelayMinutes] = useState(false);

  const HandleClick = (move: string) => { // Adding of a new animation to Queue
    if (PipelineMode) {
      var TempQueue = QueuedMoves.concat();
      TempQueue = TempQueue.concat({name: move, id: new Date().getTime().toString(), type: 'animation'});
      setQueuedMoves(TempQueue);
    }
    else butterclient.playAnimation(move.trim(), true);
  };

  const AddDelay = () => {
    var Amount = parseInt(AnimationDelay);
    if (!isNaN(Amount)) {
      var TempQueue = QueuedMoves.concat();
      var Name =  '' + Amount;
      if (DelayMinutes) Name += ' minutes delay';
      else Name += ' seconds delay';
      TempQueue = TempQueue.concat({name: Name, id: new Date().getTime().toString(), type: 'delay', minutes: DelayMinutes, amount: Amount});
      setQueuedMoves(TempQueue);
      setDelayAdderMode(false);
    }
    else alert('Please enter a valit number!');
  }

  const playAnimations = async () => { // Run an animations list one-by-one
    for (var i =0; i<QueuedMoves.length; i++) {
      if (QueuedMoves[i].type === 'animation') {
        butterclient.playAnimation(QueuedMoves[i].name.trim(), true);
      }
      else {
        if (QueuedMoves[i].minutes) await timeout(60000 * QueuedMoves[i].amount);
        else await timeout(1000 * QueuedMoves[i].amount);
     }
    }
  };
  function timeout(delay: number) { return new Promise(res => setTimeout(res, delay)); }; // delay function

  const handleDrop = (droppedItem: any) => {
    var updatedList = QueuedMoves.concat();
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    if (droppedItem.destination) {
      updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    }
    setQueuedMoves(updatedList);
  };

  const handleSwitch = () => {
    if (PipelineMode) setQueuedMoves(Array(0).fill(null));
    setPipelineMode(!PipelineMode);
  };

  const renderPipeline = () => {
    return (
      <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided: any) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {QueuedMoves.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      action {index + 1} - <span style={{ color: '#28a745'}}>{item.name}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ButtonGroup className="list-container">
        <div>
          <Button variant="secondary" style={{width: '20%'}} onClick={() => setDelayAdderMode(true)}>➕⌚</Button>
          <Button variant="success" style={{width: '80%'}} onClick={() => playAnimations()}>➤</Button>
        </div>
      </ButtonGroup>

      <Modal size="sm" show={DelayAdderMode} onHide={() => setDelayAdderMode(false)} centered>
        <Modal.Header translate="true" closeButton>
          <Modal.Title>
            Delay properties:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl placeholder="0" onChange={(event: any) => setAnimationDelay(event.target.value)}/>
            <Button variant="outline-secondary" onClick={() => setDelayMinutes(!DelayMinutes)}>{DelayMinutes ? 'minutes' : 'seconds'}</Button>
            <Button variant="outline-secondary" onClick={() => AddDelay()}>Add</Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
      </div>
    );
  };

    return (
    < >
      <Card>
        <Card.Header>
          <Card.Title>Available Moves:</Card.Title>
          <ButtonToolbar>
            {animationsList.map((move) => (<ButtonGroup><Button variant="outline-primary" onClick={() => HandleClick(move)}>{move}</Button></ButtonGroup>))} 
          </ButtonToolbar>
        </Card.Header>
        <Card.Body>
          {PipelineMode && QueuedMoves.length > 0 ? renderPipeline() : null }
        </Card.Body>
        <Card.Footer>Sequence mode: <Switch onChange={() => handleSwitch()} checked={PipelineMode} height={23} width={45}/></Card.Footer>
		   </Card>
		</>
  );
}

export default Pipeline;