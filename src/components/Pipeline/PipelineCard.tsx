import React, { useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Navbar, Nav, Form, FormControl, Button, Container, Modal, ModalBody, NavDropdown, Card } from 'react-bootstrap';
import DragList from './DragList';
import { HttpClient } from '@butter-robotics/mas-javascript-api';

function PipelineCard({PipelineList, handlePipelineDrag, handleDelete}:{PipelineList: any[], handlePipelineDrag: any, handleDelete: any}) {

    return(
      <Card>
        <Card.Header>The Pipeline <Button variant="outline-danger">reset</Button></Card.Header>
        <Card.Body>
        <DragDropContext onDragEnd={handlePipelineDrag}>
          <DragList name="Queue" arr={PipelineList} handleDelete={handleDelete}/>
        </DragDropContext>
        </Card.Body>
      </Card>
    );
}

export default PipelineCard;