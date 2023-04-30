
import {Button, Container, Card } from 'react-bootstrap';
export function RobotObject({addToPipeline }: {  addToPipeline: any }) {

  const renderButton = (name: string) => {
    return(
      <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline(name)}>{name}</Button>
    )
  }

  const moves: string[] = [
    'forward',
    'backward',
    'goLeft',
    'goRight',
    'turnLeft',
    'turnRight',
    'extendUp',
    'squatDown',
    'leanLeft',
    'leanRight',
    'twistLeft',
    'twistRight',
    'lookDown',
    'lookUp',
    'resetBody',
    'go',
    'led',
    'pose'
  ]


  return (
    <Container className='robot-card'>
      <Card >
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginBottom: 0 }}>DigiDog (not deided yet)</p>
          </div>
        </Card.Header>
          <Card.Body className='robot-object'>
            {moves.map((move) => renderButton(move))}
          </Card.Body>
      </Card>
    </Container>
    
  );
}