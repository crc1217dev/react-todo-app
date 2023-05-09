import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { orderState, toDoSelector, toDoState } from "./atoms";
import Board from "./components/Board";
import TrashCan from "./components/TrashCan";
import PlusButton from "./components/PlusButton";

const Wrapper = styled.div`
  display: flex;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
function App() {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination.droppableId === "TrashCan") {
      console.log("deleted");
      return setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (source.droppableId === destination.droppableId) {
      // 같은 보드
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        //1. delete Item on source index (기존에 있는거 삭제)
        boardCopy.splice(source.index, 1);
        //2. item을 이동한 위치에 있는 곳으로 생성
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination.index, 0, taskObj);
        console.log({ ...allBoards });
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board
              key={boardId}
              boardId={boardId}
              toDos={toDos[boardId]}
            ></Board>
          ))}
        </Boards>
        <TrashCan />
      </Wrapper>
      <PlusButton />
    </DragDropContext>
  );
}

export default App;
