import React, { useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Navbar, Nav, Form, FormControl, Button, Container, Modal, ModalBody, NavDropdown, Card, ButtonGroup } from 'react-bootstrap';
import DragList from './DragList';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { ButtonsGroup } from '../../baseUI/ButtonsGroup';

function PipelineCard({PipelineList, handlePipelineDrag, handleDelete, DelayAdderMode, run}:{PipelineList: any[], handlePipelineDrag: any, handleDelete: any, DelayAdderMode: any, run: any}) {

    return(
      <Card>
        <Card.Header>
          <div style={{display: "flex", alignItems: 'center'}}>
            The Pipeline
            <ButtonGroup style={{ marginLeft: 'auto' }}>
              <Button variant="secondary" onClick={() => DelayAdderMode()}>➕⌚</Button>
              <Button variant="danger">reset</Button>
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
    );
}

export default PipelineCard;