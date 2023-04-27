import React, { useEffect, useState } from 'react';
import { HttpClient, Response } from '@butter-robotics/mas-javascript-api';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';

export function RobotObject({ onRemove, refresh, addToPipeline }: { onRemove: (ip: string) => void, refresh: (ip: string) => void, addToPipeline: any }) {
  const [animations, setAnimations] = useState<{ name: string, status: boolean }[]>([]);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState('');
  const [speed, setSpeed] = useState('');

  useEffect(() => {
    // loadAnimations();
  }, []);

  const handleButtonClick = (action: string, animationType: string) => {
    addToPipeline(action, animationType, time, speed);
  };

  return (
    <Container className='robot-card'>
      <Card>
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>'test'</p>
          </div>
        </Card.Header>
        <Card.Body className='robot-object'>
          <Button variant='outline-primary' id='add-pipeline' title='ADD TO PIPELINE' onClick={() => handleButtonClick('goForward', 'animation')}>
            {'goForward'}
          </Button>
          <Form.Control
            type='text'
            placeholder='Enter time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Control
            type='text'
            placeholder='Enter speed'
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />

          <Button variant='outline-primary' id='add-pipeline' title='ADD TO PIPELINE' onClick={() => handleButtonClick('goBackward', 'animation')}>
            {'goBackward'}
          </Button>
          <Form.Control
            type='text'
            placeholder='Enter time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Control
            type='text'
            placeholder='Enter speed'
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />

          {/* Continue adding the remaining buttons and corresponding text boxes */}
          <Button variant='outline-primary' id='add-pipeline' title='ADD TO PIPELINE' onClick={() => handleButtonClick('goLeft', 'animation')}>
            {'goLeft'}
          </Button>
          <Form.Control
            type='text'
            placeholder='Enter time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Form.Control
            type='text'
            placeholder='Enter speed'
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />

          {/* Repeat the pattern for the remaining buttons */}
          {/* ... */}
        </Card.Body>
      </Card>
    </Container>
  );
}
