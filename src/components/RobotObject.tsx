import React, { Component, useEffect, useState } from 'react'
import { HttpClient, Response } from '@butter-robotics/mas-javascript-api';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';


export function RobotObject({ onRemove, refresh, addToPipeline }: { onRemove: (ip: string) => void, refresh: (ip: string) => void, addToPipeline: any }) {

  const [animations, setAnimations] = useState<{name: string, status: boolean}[]>([]);
  const [hiddnanim, sethiddnanimations] = useState<{name: string, status: boolean}[]>([]);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    // loadAnimations();
  }, []);
  
  //this functions hides the button and puts it in new list
  const hide = (move: any) => {
    var temp = animations.concat();
    let shownAnimations: any[] = [];
    var FinalHiddnList = hiddnanim.concat();
    for(var i = 0; i<temp.length; i++) {
      if(temp[i] == move) {temp[i].status = !temp[i].status}
      if(temp[i].status === false){FinalHiddnList =[...FinalHiddnList, temp[i]];}
      else{shownAnimations = [...shownAnimations, temp[i]];}
    }
    setAnimations(shownAnimations);
    sethiddnanimations(FinalHiddnList);
  }

  const show = (move: any) => {
    var temp = hiddnanim.concat();
    let shownAnimations= animations.concat();
    var FinalHiddnList: any[] = [];
    for(var i = 0; i<temp.length; i++) {
      if(temp[i] == move) {temp[i].status = !temp[i].status}
      if(temp[i].status === false){FinalHiddnList =[...FinalHiddnList, temp[i]];}
      else{shownAnimations = [...shownAnimations, temp[i]];}
    }
    setAnimations(shownAnimations);
    sethiddnanimations(FinalHiddnList);
    if (FinalHiddnList.length ===0) setVisible(!visible);
  }
    


  return (
    <Container className='robot-card'>
      <Card >
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>DigiDog</p>
          </div>
        </Card.Header>
          <Card.Body className='robot-object'>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('forward')}>{'forward'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('goBackward', 'animation')}>{'goBackward'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('goLeft', 'animation')}>{'goLeft'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('goRight', 'animation')}>{'goRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('turnLeft', 'animation')}>{'turnLeft'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('turnRight', 'animation')}>{'turnRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('extendUp', 'animation')}>{'extendUp'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('squatDown', 'animation')}>{'squatDown'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('leanLeft', 'animation')}>{'leanRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('twistLeft', 'animation')}>{'twistLeft'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('twistRight', 'animation')}>{'twistRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('lookDown', 'animation')}>{'lookDown'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('lookUp', 'animation')}>{'lookUp'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('resetBody', 'animation')}>{'resetBody'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('pose', 'animation')}>{'pose'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('go', 'animation')}>{'go'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('led', 'animation')}>{'led'}</Button>

          </Card.Body>
      </Card>
      {visible && <Card><Card.Body className='hidden-body'> {hiddnanim.map((but) =>  <ButtonGroup  aria-label="Basic example">
              <div >
              <Button  variant="outline-secondary" onClick={() => show(but)} style={{ marginRight: 'auto' }}>{but.name}</Button>
              </div></ButtonGroup>)}</Card.Body></Card>}
    </Container>
    
  );
}