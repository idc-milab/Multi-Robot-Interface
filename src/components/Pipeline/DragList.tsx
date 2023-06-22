import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import DragItem from './DragItem';

function DragList({name, arr, handleDelete, currentAnimation}:{name: string, arr: any[], handleDelete: any, currentAnimation: number}) {

  if (arr.length !== 0) {
    return(
      <Droppable droppableId={name}>
        {(provided: any) => (
          <div
            className="list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {arr.map((item, index) => (<DragItem item={item} index={index} handleDelete={handleDelete} running={index === currentAnimation}/>))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
  }
  else return(<h6 style={{color: '#757575',opacity: '0.7'}}>Pipeline is currently empty...</h6>);

    
}

export default DragList;