
import {Button, Container, Card } from 'react-bootstrap';
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
            {renderButton('forward')}
            {renderButton('backward')}
            {renderButton('goLeft')}
            {renderButton('goRight')}
            {renderButton('turnLeft')}
            {renderButton('turnRight')}
            {renderButton('extendUp')}
            {renderButton('squatDown')}
            {renderButton('leanLeft')}
            {renderButton('leanRight')}
            {renderButton('twistLeft')}
            {renderButton('twistRight')}
            {renderButton('lookDown')}
            {renderButton('lookUp')}
            {renderButton('resetBody')}
            {renderButton('go')}
            {renderButton('led')}
            {renderButton('pose')}
          </Card.Body>
      </Card>
    </Container>
    
  );
}