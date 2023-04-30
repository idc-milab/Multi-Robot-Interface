import {Button, Container, Card } from 'react-bootstrap';
import { Commands } from '../data/DogCommands';
export function RobotObject({addToPipeline }: {  addToPipeline: any }) {

  const renderButton = (name: string) => {
    return(
      <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline(name)}>{name}</Button>
    )
  }

  return (
    <Container className='robot-card'>
      <Card >
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>DigiDog (not deided yet)</p>
          </div>
        </Card.Header>
          <Card.Body className='robot-object'>
            {Object.keys(Commands).map((move) => renderButton(move))}
          </Card.Body>
      </Card>
    </Container>
    
  );
}