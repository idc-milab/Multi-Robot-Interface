import React, { Component, useEffect, useState } from 'react'
import { HttpClient, Response } from '@butter-robotics/mas-javascript-api';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';


export function RobotObject({ butterClient, onRemove, refresh, addToPipeline }: { butterClient: HttpClient, onRemove: (ip: string) => void, refresh: (ip: string) => void, addToPipeline: any }) {

  const [animations, setAnimations] = useState<{name: string, status: boolean}[]>([]);
  const [hiddnanim, sethiddnanimations] = useState<{name: string, status: boolean}[]>([]);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    loadAnimations();
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
  
  }
    
    const loadAnimations = async () => {
    setTimeout(() => {
    }, 5000)
    const res:Response = await butterClient.getAvailableAnimations();
    if (res.status !== 200) {
      console.error('Failed to get robot animations', res);
      return;
    }
    const data: string = res.data.response.data as string;
    const animations = data.replace('[', '').replace(']', '').replace(/\\s+/, '').split(',');
    console.log(animations);

    //this turns the animations string list to an object list that is comprised of the name of animation
    // and its status true/false
    let tempo= Array(0);
    animations.map ((n) => {
    var newAnimobject = {name: n, status: true};
    tempo = [...tempo, newAnimobject];
    });
  
    setAnimations(tempo);
  }
  
  const playAnimationByName = (animation: string) => {
    butterClient.playAnimation(animation.trim());
  }


  return (
    <Container className='robot-card'>
      <Card >
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>{butterClient.ip}</p>
            <ButtonGroup style={{ marginLeft: 'auto' }}>
              {((animations.length !== 0) || (hiddnanim.length !==0)) ? <Button type="button" variant="light" title ='SHOW HIDDEN' onClick={() => setVisible(!visible)}>{visible ? <s>👁</s> : '👁'}</Button> 
              : null}
              <Button type="button" variant="light" aria-hidden="true" title ='REFRESH' onClick={() => refresh(butterClient.ip)}>↺</Button>
              <Button type="button" variant="light" aria-hidden="true" title ='CLOSE' onClick={() => onRemove(butterClient.ip)}>X</Button>
            </ButtonGroup>
          </div>
        </Card.Header>
          <Card.Body key={butterClient.ip} className='robot-object'>
              {animations.length === 0 ? 'No animations were loaded from the robot... please try again...' : 
              animations.map((move) => 
                  <ButtonGroup>
                                
                                  <div className='btnGroup1'>
                                    <Button variant='outline-secondary' id='hide-button' title ='HIDE' onClick={() => hide(move)} >X</Button>
                      {move.status ? <Button variant='outline-success' id='play-button' title ='PLAY'
                                      onClick={() => playAnimationByName(move.name)}>➤</Button>: null} 
                                </div>
                                <div className='btnGroup2'>
                    {move.status ? <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline(move.name, 'animation', butterClient.ip)}>{move.name}</Button>: null}
                                  </div>
                                

                  
                  </ButtonGroup>
            )}
          </Card.Body>
      </Card>
      {visible && <Card><Card.Body className='hidden-body'> {hiddnanim.map((but) =>  <ButtonGroup  aria-label="Basic example">
              <div >
              <Button  variant="outline-secondary" onClick={() => show(but)} style={{ marginRight: 'auto' }}>{but.name}</Button>
              </div></ButtonGroup>)}</Card.Body></Card>}
    </Container>
    
  );
}

