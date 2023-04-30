import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DragItem from "./DragItem";

function DragList({ arr, handleDelete, updateSpeed }: any) {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {arr.map((item: any, index: number) => (
            <DragItem
              item={item}
              index={index}
              handleDelete={handleDelete}
              updateField={updateSpeed}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DragList;
