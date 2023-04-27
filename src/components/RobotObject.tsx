
import {Button, Container, ButtonGroup, Card } from 'react-bootstrap';
export function RobotObject({addToPipeline }: {  addToPipeline: any }) {


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
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('backward')}>{'backward'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('goLeft')}>{'goLeft'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('goRight')}>{'goRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('turnLeft')}>{'turnLeft'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('turnRight')}>{'turnRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('extend')}>{'extendUp'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('squat')}>{'squatDown'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('leanLeft')}>{'leanRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('twistLeft')}>{'twistLeft'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('twistRight')}>{'twistRight'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('lookDown')}>{'lookDown'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('lookUp')}>{'lookUp'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('resetBody')}>{'resetBody'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('go')}>{'go'}</Button>
            <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline('led', 'animation')}>{'setLedColor'}</Button>
          </Card.Body>
      </Card>
    </Container>
    
  );
}