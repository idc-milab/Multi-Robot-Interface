import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ButtonGroup, ButtonToolbar, Dropdown, InputGroup, SplitButton } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import RangeSlider from 'react-bootstrap-range-slider';

const MaxNum = 5;

function Pipeline(this: any, {animationsList, butterclient}: {animationsList:string[], butterclient: HttpClient})  {

  const [QueuedMoves, setQueuedMoves] = useState(Array(MaxNum).fill(null));
  const [ActiveNum, setActiveNum] = useState(0);
  const [AnimationDelay, setAnimationDelay] = useState(1);


  const HandleClickAdd = (move: string) => {
    var TempQueue = ExtractMoves(QueuedMoves);

      if (ActiveNum < MaxNum) {
        TempQueue = TempQueue.concat(move);
        setActiveNum(ActiveNum + 1);
        UpdateQueue(TempQueue);
      }
      else alert('Queue is Full!');
  };

  const HandleClickRemove = (index: any) => {
    var TempQueue = ExtractMoves(QueuedMoves);

    TempQueue.splice(index, 1);
    setActiveNum(ActiveNum - 1);
    UpdateQueue(TempQueue);
  }

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
      return (
        <ButtonGroup><Button variant={QueuedMoves.indexOf(move) === -1 ? "outline-primary" :"outline-success"} onClick={() => HandleClickAdd(move)}>{move}</Button></ButtonGroup>
      );
  }

  const renderPipelineButton = (move: string, index: any) => {
    if (move === null) return (<Button variant="outline-success" disabled>-</Button>);
    else return (<Button variant="outline-danger" onClick={() => HandleClickRemove(index)}>{move}</Button>);
  }

  const playAnimations = async (animations: string[]) => {
    for (var i =0; i<animations.length; i++) {
      butterclient.playAnimation(animations[i].trim(), true);
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
        <ButtonGroup>
          {QueuedMoves.map((move, index) => renderPipelineButton(move, index))}
          <SplitButton title="START" id="dropdown-menu-align-responsive-2" variant="danger" onClick={() => playAnimations(ExtractMoves(QueuedMoves))}>
            <Dropdown.ItemText>
              <InputGroup className="mb-3">
                Delay length (seconds):
              </InputGroup>
            </Dropdown.ItemText>
            <Dropdown.ItemText>
              <RangeSlider value={AnimationDelay} min={0} max={10} tooltip='auto' onChange={changeEvent => setAnimationDelay(parseInt(changeEvent.target.value))} />
            </Dropdown.ItemText>
          </SplitButton>
        </ButtonGroup>
		   </Card> 
		</>
  );
}

export default Pipeline;