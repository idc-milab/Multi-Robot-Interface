import React, { useState } from 'react';
import { Droppable } from "react-beautiful-dnd";
import DragItem from './DragItem';
import { HttpClient } from '@butter-robotics/mas-javascript-api';

function DragList({name, arr, handleDelete}:{name: string, arr: any[], handleDelete: any}) {

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

export default DragList;