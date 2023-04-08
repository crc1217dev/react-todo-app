import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CCategory from "./CCategory";
import styled from "styled-components";

const Container = styled.div``;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <Container>
      <h1>To Dos</h1>
      <hr />
      <CCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
