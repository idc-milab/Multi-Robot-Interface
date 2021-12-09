import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import { Button } from 'react-bootstrap';
import DragItem from './DragItem';

function DragList({name, arr, handleDelete}:{name: string, arr: any[], handleDelete: any}) {

  if (arr.length !== 0) {
    return(
      <Droppable droppableId={name}>
        {(provided: any) => (
          <div
            className="list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {arr.map((item, index) => (<DragItem item={item} index={index} handleDelete={handleDelete}/>))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
  }
  else return(<h6 style={{color: '#757575',opacity: '0.7'}}>Pipeline is currently empty...</h6>);

    
}

export default DragList;