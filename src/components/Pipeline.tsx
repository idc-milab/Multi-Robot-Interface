import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ButtonGroup, ButtonToolbar, Dropdown, InputGroup } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import RangeSlider from 'react-bootstrap-range-slider';

const MaxNum = 5;

function Pipeline(this: any, {animationsList, butterclient}: {animationsList:string[], butterclient: HttpClient})  {

  const [QueuedMoves, setQueuedMoves] = useState(Array(MaxNum).fill(null));
  const [ActiveNum, setActiveNum] = useState(0);
  const [AnimationDelay, setAnimationDelay] = useState(1);


  const HandleClick = (move: string) => {
    const indexInQueue = QueuedMoves.indexOf(move);
    var TempQueue = ExtractMoves(QueuedMoves);

    if (indexInQueue === -1) { // move is NOT in queue
      if (ActiveNum < MaxNum) {
        TempQueue = TempQueue.concat(move);
        setActiveNum(ActiveNum + 1);
      }
      else alert('Queue is Full!');
    }

    else { // move IS in queue
      TempQueue.splice(indexInQueue, 1);
      setActiveNum(ActiveNum - 1);
    }

    UpdateQueue(TempQueue);
  };

  const UpdateQueue = (Active: string[]) => {
    var Queue = Array(MaxNum).fill(null);
    for (var i = 0; i < Active.length; i++) {
      Queue[i] = Active[i];
    }
    setQueuedMoves(Queue);
  }

  const ExtractMoves = (MovesArr: string[]) => {
    var Moves = Array(0);
    for (var i = 0; i < MovesArr.length; i++) {
      if (MovesArr[i] != null){
        Moves = Moves.concat(MovesArr[i]);
      }
    }
    return Moves;
  }

  const renderMovesListButton = (move: string) => {
    if (QueuedMoves.indexOf(move) === -1) {
      return (
        <ButtonGroup><Button variant="outline-primary" onClick={() => HandleClick(move)}>{move}</Button></ButtonGroup>
      );
    }
    else {
      return (
        <ButtonGroup><Button variant="outline-secondary" disabled>{move}</Button></ButtonGroup>
      );
    }
  }

  const renderPipelineButton = (move: string) => {
    if (move === null) {
      return (
        <Button variant="outline-success" disabled>-</Button>
      );
    }
    else {
      return (
        <Button variant="outline-danger" onClick={() => HandleClick(move)}>{move}</Button>
      );
    }
  }

  const playAnimations = async (animations: string[]) => {
    for (var i =0; i<animations.length; i++) {
      butterclient.playAnimation(animations[i].trim())
      await timeout(1000 * AnimationDelay); //for 1 sec delay
     }
  }

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}
  
    return (
    < >
      <Card>
        <Card.Header>
          <Card.Title>Available Moves:</Card.Title>
            <ButtonToolbar>
              {animationsList.map((move) => renderMovesListButton(move))}
            </ButtonToolbar>
        </Card.Header>
        <Dropdown as={ButtonGroup}>
          {QueuedMoves.map((move) => renderPipelineButton(move))}
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
           <Dropdown.Menu>
             <Dropdown.ItemText>
               <InputGroup className="mb-3">
                 Delay length (seconds):
               </InputGroup>
             </Dropdown.ItemText>
             <Dropdown.ItemText>
               <RangeSlider value={AnimationDelay} min={0} max={10} tooltip='auto' onChange={changeEvent => setAnimationDelay(parseInt(changeEvent.target.value))} />
             </Dropdown.ItemText>
           </Dropdown.Menu>
           <Button  variant="danger"  onClick={ () => playAnimations(ExtractMoves(QueuedMoves))}>START</Button>
         </Dropdown>
		   </Card> 
		</>
  );
}

export default Pipeline;