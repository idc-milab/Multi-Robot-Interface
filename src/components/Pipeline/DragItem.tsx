import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, FormControl } from 'react-bootstrap';
import { Commands } from '../../data/DogCommands';

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

  const renderForm = (field: string) => {
    return(
      <>
        <span style={{ color:'gray' }}>{field}:</span>
        <FormControl
          type="number"
          min={Commands[item.name][field]['min']}
          max={Commands[item.name][field]['max']}
          step={Commands[item.name][field]['step']}
          value={item[field]}
          onChange={(e) => handleFieldChange(e, field)}
          style={{ marginRight: '1rem', width: '5rem' }}
        />
      </>
    )
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
          <div className='dragItem'>
              [{index + 1}]
              <div>
               <span style={{ color:'#e69226', fontWeight: 'bold' }}>{item.name}</span>
              </div>
                {item.type === 'action' && Object.keys(Commands[item.name]).map((field) => renderForm(field))}
                <Button variant="outline-danger" onClick={() => handleDelete(index)}>🗑</Button>
            </div>
        </div>
      )}
    </Draggable>
  );
};

export default DragItem;
