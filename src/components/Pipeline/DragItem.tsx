import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, FormControl } from 'react-bootstrap';

interface DragItemProps {
  item: any;
  index: number;
  handleDelete: (index: number) => void;
  updateField: (index: number, field: string, speed: number) => void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  boxShadow: isDragging ? '0 4px 8px 0 grey' : 'none',
  ...draggableStyle,
});

const DragItem: React.FC<DragItemProps> = ({ item, index, handleDelete, updateField }) => {
  const handleFieldChange = (e: React.ChangeEvent<any>, field: string) => {updateField(index, field, parseFloat(e.target.value));};

  const renderForm = (min: number, max: number, step: number, value: number, field: string) => {
    return(
      <>
        <span style={{ color:'gray' }}>{field}:</span>
        <FormControl
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => handleFieldChange(e, field)}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
      </>
    )
  }

  const getForms = () => {
    if (item.name === 'go') {
      return(
        <>
          {renderForm(-1, 1, 0.05, item.LRspeed, 'LRspeed')}
          {renderForm(-1, 1, 0.05, item.tLRspeed, 'tLRspeed')}
          {renderForm(-1, 1, 0.05, item.BFspeed, 'BFspeed')}
          {renderForm(0, 50000, 500, item.duration, 'duration')}
        </>
      )
    }
    else if (item.name === 'pose') {
      return(
        <>
          {renderForm(-1, 1, 0.05, item.leanLRamount, 'leanLRamount')}
          {renderForm(-1, 1, 0.05, item.tLRamount, 'tLRamount')}
          {renderForm(-1, 1, 0.05, item.lookUDamount, 'lookUDamount')}
          {renderForm(-1, 1, 0.05, item.ESamount, 'ESamount')}
          {renderForm(0, 50000, 0.05, item.duration, 'duration')}
        </>
      )
    }
    else if (item.name === 'led') {
      return(
        <>
          {renderForm(0, 255, 1, item.r, 'r')}
          {renderForm(0, 255, 1, item.g, 'g')}
          {renderForm(0, 255, 1, item.b, 'b')}
        </>
      )
    }
    else if (item.name === 'resetBody') {
      return(
        <>
        </>
      )
    }
    else {
      return(
        <>
          {renderForm(0, 1, 0.05, item.speed, 'speed')}
          {renderForm(0, 50000, 0.05, item.duration, 'duration')}
        </>
      )
    }
  }

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
               <span style={{ color:'#e69226', fontWeight: 'bold' }}>{item.name}</span>
              </div>
                {getForms()}
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
