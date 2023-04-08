import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const DeleteButton = styled.button`
  background-color: red;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (category: Categories) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, category, id };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
      <DeleteButton onClick={() => onDelete()}>Delete</DeleteButton>
    </li>
  );
}

export default ToDo;
