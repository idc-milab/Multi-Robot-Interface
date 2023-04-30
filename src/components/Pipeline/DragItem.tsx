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
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "speed", parseFloat(e.target.value));};
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "duration", parseFloat(e.target.value));};
  const handleLRChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "LRspeed", parseFloat(e.target.value));};
  const handleTLRChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "tLRspeed", parseFloat(e.target.value));};
  const handleBFChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "BFspeed", parseFloat(e.target.value));};
  const handleLLRChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "leanLRamount", parseFloat(e.target.value));};
  const handleLUDChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "lookUDamount", parseFloat(e.target.value));};
  const handleESChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "ESamount", parseFloat(e.target.value));};
  const handleRChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "r", parseFloat(e.target.value));};
  const handleGChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "g", parseFloat(e.target.value));};
  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {updateField(index, "b", parseFloat(e.target.value));};

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
                onChange={handleLRChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>tLRspeed:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.tLRspeed}
                onChange={handleTLRChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>BFspeed:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.BFspeed}
                onChange={handleBFChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>duration:</span>
              <FormControl
                type="number"
                min="1"
                step="500"
                defaultValue={"1"}
                value={item.duration}
                onChange={handleDurationChange}
                style={{ marginRight: '1rem', width: '4rem' }}
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
                onChange={handleLLRChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>tLRamount:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.tLRamount}
                onChange={handleTLRChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>lookUDamount:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.lookUDamount}
                onChange={handleLUDChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>ESamount:</span>
              <FormControl
                type="number"
                min="-1"
                max="1"
                step="0.05"
                value={item.ESamount}
                onChange={handleESChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>Duration:</span>
              <FormControl
                type="number"
                min="1"
                defaultValue={"1"}
                step="500"
                value={item.duration}
                onChange={handleDurationChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
        </>
      )
    }
    else if (item.name === 'led') {
      return(
        <>
        <span style={{ color:'gray' }}>R:</span>
        <FormControl
                type="number"
                min="0"
                max="255"
                step="1"
                value={item.r}
                onChange={handleRChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>G:</span>
              <FormControl
                type="number"
                min="0"
                max="255"
                step="1"
                value={item.g}
                onChange={handleGChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>B:</span>
              <FormControl
                type="number"
                min="0"
                max="255"
                step="1"
                value={item.b}
                onChange={handleBChange}
                style={{ marginRight: '1rem', width: '4rem' }}
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
                onChange={handleSpeedChange}
                style={{ marginRight: '1rem', width: '4rem' }}
              />
              <span style={{ color:'gray' }}>Duration:</span>
              <FormControl
                type="number"
                min="1"
                step="500"
                defaultValue={"1"}
                value={item.duration}
                onChange={handleDurationChange}
                style={{ marginRight: '1rem', width: '4rem' }}
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
