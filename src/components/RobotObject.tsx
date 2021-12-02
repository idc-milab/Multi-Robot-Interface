import React, { Component, useEffect, useState } from 'react'
import { HttpClient, Response } from '@butter-robotics/mas-javascript-api';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';


export function RobotObject({ butterClient, onRemove, addToPipeline }: { butterClient: HttpClient, onRemove: (ip: string) => void, addToPipeline: any }) {

  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    loadAnimations();
  }, []);

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
    setAnimations(animations);
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
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <div key={butterClient.ip} className='robot-object'>
          {animations.length === 0 ? 'There was a problem connecting to the robot.. please try again..' : 
          animations.map((move) => (<ButtonGroup><Button variant="outline-primary" onClick={() => addToPipeline(move, 'animation', butterClient)}>{move}</Button></ButtonGroup>))
          }
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

