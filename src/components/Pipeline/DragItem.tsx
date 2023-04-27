import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, FormControl } from 'react-bootstrap';

interface DragItemProps {
  item: {
    id: string;
    name: string;
    speed: number;
    time: number;
  };
  index: number;
  handleDelete: (index: number) => void;
  updateSpeed: (index: number, speed: number) => void;
  updateTime: (index: number, time: number) => void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  boxShadow: isDragging ? '0 4px 8px 0 grey' : 'none',
  ...draggableStyle,
});

const updateSpeed = (index: number, speed: number) => {
  // Update the speed of the item at the given index in your pipeline state.
};

const updateTime = (index: number, time: number) => {
  // Update the time of the item at the given index in your pipeline state.
};

const DragItem: React.FC<DragItemProps> = ({ item, index, handleDelete, updateSpeed, updateTime }) => {
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSpeed(index, parseFloat(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTime(index, parseFloat(e.target.value));
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="item-container"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              [{index + 1}]
              <div>
               <span style={{ color:'#e69226' }}>{item.name}</span>
              </div>
              <FormControl
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={item.speed}
                onChange={handleSpeedChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <FormControl
                type="number"
                min="0"
                value={item.time}
                onChange={handleTimeChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <Button variant="outline-danger" onClick={() => handleDelete(index)}>
                🗑
              </Button>
            </div>
        </div>
      )}
    </Draggable>
  );
};

export default DragItem;
