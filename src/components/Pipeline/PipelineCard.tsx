import React from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Card, ButtonGroup } from 'react-bootstrap';
import DragList from './DragList';

function PipelineCard({PipelineList, handlePipelineDrag, handleDelete, DelayAdderMode, run, reset}:{PipelineList: any[], handlePipelineDrag: any, handleDelete: any, DelayAdderMode: any, run: any, reset: any}) {

    return(
      <div className='pipeline-card'>
      <Card>
        <Card.Header>
          <div style={{display: "flex", alignItems: 'center'}}>
            The Pipeline
            <ButtonGroup style={{ marginLeft: 'auto' }}>
              <Button variant="secondary" onClick={() => DelayAdderMode()}>➕⌚</Button>
              <Button variant="danger" onClick={() => reset()}>reset</Button>
              <Button variant="success" onClick={() => run()}>➤</Button>
            </ButtonGroup>
            
          </div>
        </Card.Header>
        <Card.Body>
        <DragDropContext onDragEnd={handlePipelineDrag}>
          <DragList name="Queue" arr={PipelineList} handleDelete={handleDelete}/>
        </DragDropContext>
        </Card.Body>
      </Card>
      </div>
    );
}

export default PipelineCard;