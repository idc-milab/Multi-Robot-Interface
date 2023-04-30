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

  const getForms = () => {
    if (item.name === 'go') {
      return(
        <>
        <span style={{ color:'gray' }}>LRspeed:</span>
        <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.LRspeed}
                onChange={(e) => handleFieldChange(e, "LRspeed")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>tLRspeed:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.tLRspeed}
                onChange={(e) => handleFieldChange(e, "tLRspeed")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>BFspeed:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.BFspeed}
                onChange={(e) => handleFieldChange(e, "BFspeed")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>duration:</span>
              <FormControl
                type="number"
                min="0"
                step="500"
                defaultValue={"1"}
                value={item.duration}
                onChange={(e) => handleFieldChange(e, "duration")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
        </>
      )
    }
    else if (item.name === 'pose') {
      return(
        <>
        <span style={{ color:'gray' }}>leanLRamount:</span>
        <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.leanLRamount}
                onChange={(e) => handleFieldChange(e, "leanLRamount")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>tLRamount:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.tLRamount}
                onChange={(e) => handleFieldChange(e, "tLRspeed")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>lookUDamount:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.lookUDamount}
                onChange={(e) => handleFieldChange(e, "lookUDamount")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>ESamount:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.ESamount}
                onChange={(e) => handleFieldChange(e, "ESamount")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>duration:</span>
              <FormControl
                type="number"
                min="0"
                defaultValue={"1"}
                step="500"
                value={item.duration}
                onChange={(e) => handleFieldChange(e, "duration")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
        </>
      )
    }
    else if (item.name === 'led') {
      return(
        <>
        <span style={{ color:'gray' }}>r:</span>
        <FormControl
                type="number"
                min="0"
                max="255"
                step="1"
                value={item.r}
                onChange={(e) => handleFieldChange(e, "r")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>g:</span>
              <FormControl
                type="number"
                min="0"
                max="255"
                step="1"
                value={item.g}
                onChange={(e) => handleFieldChange(e, "g")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>b:</span>
              <FormControl
                type="number"
                min="0"
                max="255"
                step="1"
                value={item.b}
                onChange={(e) => handleFieldChange(e, "b")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
        </>
      )
    }
    else {
      return(
        <>
        <span style={{ color:'gray' }}>Speed:</span>
        <FormControl
                type="number"
                min="0"
                max="1"
                step="0.05"
                value={item.speed}
                onChange={(e) => handleFieldChange(e, "speed")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
              <span style={{ color:'gray' }}>Duration:</span>
              <FormControl
                type="number"
                min="0"
                step="500"
                defaultValue={"1"}
                value={item.duration}
                onChange={(e) => handleFieldChange(e, "duration")}
                style={{ marginRight: '1rem', width: '5rem' }}
              />
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
               <span style={{ color:'#e69226' }}>{item.name}</span>
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
