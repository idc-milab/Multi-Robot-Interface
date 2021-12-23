import React, { Component, useEffect, useState } from 'react'
import { HttpClient, Response } from '@butter-robotics/mas-javascript-api';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';
import { Grid, Item } from 'semantic-ui-react';
import { updateYield } from 'typescript';
import { State } from 'react-beautiful-dnd';
import { ClassDictionary } from 'classnames/types';


export function RobotObject({ butterClient, onRemove, addToPipeline }: { butterClient: HttpClient, onRemove: (ip: string) => void, addToPipeline: any }) {

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
            <Button type="button"  className='remove btn' variant="outline-danger" aria-hidden="true" onClick={() => onRemove(butterClient.ip)} style={{ marginLeft: 'auto' }}> 
            🗑
            </Button>
          </div>
        </Card.Header>
          <Grid key={butterClient.ip} classname='robot-object'>
              {animations.length === 0 ? 'No animations were loaded from the robot... please try again...' : 
              animations.map((move) => 
             <ButtonGroup>
              <Button type="button"  className='remove btn' variant="outline-danger" onClick={() => hide(move)} style={{ marginLeft: 'auto' }}>🗑</Button>
              {move.status ? <Button variant="outline-primary" onClick={() => addToPipeline(move.name, 'animation', butterClient)}>{move.name}</Button>: null}
            </ButtonGroup>
            )}
          
          </Grid>
      </Card>
      <Button variant="outline-primary" className="btn btn-outline-info" onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
      {visible && <Card className='robot-object'> {hiddnanim.map((but) =>  <ButtonGroup  aria-label="Basic example">
              <Button variant="outline-secondary" onClick={() => show(but)} style={{ marginRight: 'auto' }}>{but.name}</Button></ButtonGroup>)}</Card>}
      
    </Container>
    
  );
}

