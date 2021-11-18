import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ButtonGroup, ButtonToolbar, Dropdown, InputGroup, SplitButton } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import RangeSlider from 'react-bootstrap-range-slider';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Pipeline(this: any, {animationsList, butterclient}: {animationsList:string[], butterclient: HttpClient})  {

  const [QueuedMoves, setQueuedMoves] = useState(Array(0).fill(null));
  const [AnimationDelay, setAnimationDelay] = useState(0);

  const HandleClickAdd = (move: string) => { // Adding of a new animation to Queue
    var TempQueue = QueuedMoves.concat();
    TempQueue = TempQueue.concat({name: move, id: Math.floor((Math.random() * 1000) + 1).toString()});
    setQueuedMoves(TempQueue);
  };

  const playAnimations = async (animations: string[]) => { // Run an animations list one-by-one
    for (var i =0; i<animations.length; i++) {
      butterclient.playAnimation(animations[i].trim(), true);
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


    return (
    < >
      <Card>
        <Card.Header>
          <Card.Title>Available Moves:</Card.Title>
            <ButtonToolbar>
              {animationsList.map((move) => (<ButtonGroup><Button variant="outline-primary" onClick={() => HandleClickAdd(move)}>{move}</Button></ButtonGroup>))} 
            </ButtonToolbar>
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>Current Sequence:</Card.Footer>
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
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
		   </Card>
		</>
  );
}

export default Pipeline;