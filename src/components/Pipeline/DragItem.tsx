import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Button } from 'react-bootstrap';

function DragItem({item, index, handleDelete, running}:{item: any, index: number, handleDelete: any, running: boolean}) {

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    boxShadow: isDragging ? '0 4px 8px 0 grey' : 'none',
    backgroundColor: running ? 'grey' : 'white',
    ...draggableStyle
  });

  const contents = () => {

    if (item.type === 'animation'){ // render animation info
      return(
        <div style={{display: "flex", justifyContent: "space-around"}}>
          [{index + 1}]
          <div><span style={{color: '#757575',opacity: '0.7'}}>{item.ip}:</span><span style={{ color: '#28a745'}}>{item.name}</span></div>
          <Button variant="outline-danger" onClick={() => handleDelete(index)}>🗑</Button>
        </div>
      );
    }

    else if (item.type === 'delay') { // render delay info
      return(
        <div style={{display: "flex", justifyContent: "space-around"}}>
          [{index + 1}]
          <div><span style={{color: '#757575',opacity: '0.7'}}>Time: </span><span style={{ color: '#e69226'}}>{item.name}</span></div>
          <Button variant="outline-danger" onClick={() => handleDelete(index)}>🗑</Button>
        </div>
      );
    }

    else if (item.type === 'loop start' || item.type === 'loop end') { // render delay info
      return(
        <div style={{display: "flex", justifyContent: "space-around"}}>
          [{index + 1}]
          <div><span style={{color: '#757575',opacity: '0.7'}}></span><span style={{ color: '#e69226'}}>{item.name}</span></div>
          <Button variant="outline-danger" onClick={() => handleDelete(index)}>🗑</Button>
        </div>
      );
    }

    else alert('Problem with item type insertion to the list!');

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