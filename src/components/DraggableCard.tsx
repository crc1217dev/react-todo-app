import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? props.theme.accentColor : props.theme.cardBgColor};
  padding: 10px 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.1)" : "none"};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  console.log({ toDoText }, "has been Rerendered");
  return (
    <Draggable key={toDoText} draggableId={toDoText} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
