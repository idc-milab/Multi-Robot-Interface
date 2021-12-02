import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Button } from 'react-bootstrap';

function DragItem({item, index, handleDelete}:{item: any, index: number, handleDelete: any}) {

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    boxShadow: isDragging ? '0 4px 8px 0 grey' : 'none',
    ...draggableStyle
  });

  const contents = () => {
    if (item.type === 'animation'){
      return(
        <div style={{display: "flex", justifyContent: "space-around"}}>
          [ {index + 1} ]
          <div style={{ color: '#28a745'}}>[ {item.client.ip} ]</div>
          <div style={{ color: '#28a745'}}>{item.name}</div>
          <Button variant="outline-danger" onClick={() => handleDelete(index)}>🗑</Button>
        </div>
      );
    }
    else if (item.type === 'delay') {
      return(
        <div style={{display: "flex", justifyContent: "space-around"}}>
          [ {index + 1} ]
          <div style={{ color: '#e69226'}}>[ Delay ]</div>
          <div style={{ color: '#28a745'}}>{item.name}</div>
          <Button variant="outline-danger" onClick={() => handleDelete(index)}>🗑</Button>
        </div>
      );
    }
    else alert('Problem with item type inserting to the list!');
  }

  return(
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          className="item-container"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {contents()}
        </div>
      )}
    </Draggable>
  );
}

export default DragItem;