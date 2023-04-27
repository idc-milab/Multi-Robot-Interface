import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DragItem from "./DragItem";

function DragList({ arr, handleDelete, updateSpeed, updateTime }: any) {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {arr.map((item: { id: string; type: "delay" | "animation"; ip?: string | undefined; name: string; speed: number; time: number; }, index: number) => (
            <DragItem
              item={item}
              index={index}
              handleDelete={handleDelete}
              updateSpeed={updateSpeed}
              updateTime={updateTime}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DragList;
