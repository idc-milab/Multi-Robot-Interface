import React, { useEffect, useState } from 'react'
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { Button, Container, Card } from 'react-bootstrap';


export function RobotObject({ butterClient, onRemove }: { butterClient: HttpClient, onRemove: (ip: string) => void }) {

  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    loadAnimations();
  }, []);

  const loadAnimations = async () => {
    setTimeout(() => {
    }, 5000)
    const res = await butterClient.getAvailableAnimations();
    if (res.status !== 200) {
      console.error('Failed to get robot animations', res);
      return;
    }
    const animations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(/\\s+/, '').split(',');
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
        <Card.Body>
          <div key={butterClient.ip} className='robot-object'>
            {animations.length === 0 ? 'There was a problem connecting to the robot.. please try again..' : animations.map(animation => (
              <Button variant='secondary' className='animation-button' key={animation} onClick={() => playAnimationByName(animation)}>{animation}</Button>
            ))}

          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

