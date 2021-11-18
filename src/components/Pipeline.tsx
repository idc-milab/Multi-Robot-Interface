import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ButtonGroup, ButtonToolbar, Dropdown, InputGroup, SplitButton } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Switch from "react-switch";

function Pipeline(this: any, {animationsList, butterclient}: {animationsList:string[], butterclient: HttpClient})  {

  const [QueuedMoves, setQueuedMoves] = useState(Array(0).fill(null));
  const [AnimationDelay, setAnimationDelay] = useState(0);
  const [PipelineMode, setPipelineMode] = useState(false);

  const HandleClick = (move: string) => { // Adding of a new animation to Queue
    if (PipelineMode) {
      var TempQueue = QueuedMoves.concat();
      TempQueue = TempQueue.concat({name: move, id: new Date().getTime().toString()});
      setQueuedMoves(TempQueue);
    }
    else butterclient.playAnimation(move.trim(), true);
  };

  const playAnimations = async () => { // Run an animations list one-by-one
    for (var i =0; i<QueuedMoves.length; i++) {
      butterclient.playAnimation(QueuedMoves[i].name.trim(), true);
      await timeout(1000 * AnimationDelay); //for 1 sec delay
     }
  }
  function timeout(delay: number) { return new Promise(res => setTimeout(res, delay)); } // delay function

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
  }

  const renderPipeline = () => {
    return (
      <div>
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
                      {index} - {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      { QueuedMoves.length > 0 ? <Button variant="danger" className="list-container" onClick={() => playAnimations}>RUN SEQUENCE</Button> : null }
      </div>
    );
  }


    return (
    < >
      <Card>
        <Card.Header>
          <Card.Title>Available Moves:</Card.Title>
          <ButtonToolbar>
            {animationsList.map((move) => (<ButtonGroup><Button variant="outline-primary" onClick={() => HandleClick(move)}>{move}</Button></ButtonGroup>))} 
          </ButtonToolbar>
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>Sequence mode: <Switch onChange={() => handleSwitch()} checked={PipelineMode} height={23} width={45} /></Card.Footer>
        {PipelineMode ? renderPipeline() : null }
		   </Card>
		</>
  );
}

export default Pipeline;