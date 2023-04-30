import {Button, Container, Card } from 'react-bootstrap';
import { Commands } from '../data/DogCommands';
export function RobotObject({addToPipeline }: {  addToPipeline: any }) {


 /**
 * This function renders a Button component with a given name, and sets up an onClick event handler.
 * When the button is clicked, it triggers the addToPipeline function with the provided name.
 * 
 * @param name - The string to be displayed on the button and passed to the addToPipeline function.
 * @returns A React Button component with the specified properties and event handler.
 */
  const renderButton = (name: string) => {
    return(
      <Button variant='outline-primary' id='add-pipeline' title ='ADD TO PIPELINE' onClick={() => addToPipeline(name)}>{name}</Button>
    )
  }


  /**
  * This component renders a card for a robot, with a header displaying its name and a body containing buttons for each command.
  * Card body component:
  * displays all available command buttons for the robot. It iterates through the 'Commands' 
  * object and renders each button using the 'renderButton' function. The component uses a 'robot-object' class for styling purposes.
  */
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