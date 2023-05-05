import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";

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
const AddBoard = styled.svg`
  position: absolute;
  bottom: 50px;
  right: 50px;
`;
const DeleteBoard = styled.svg`
  position: absolute;
  top: 50px;
  right: 50px;
`;
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
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
  const handleAddBoard = () => {
    const addBoardPrompt = prompt(
      "추가할 보드의 제목을 입력해 주세요.",
      "ToDo List"
    );
    if (addBoardPrompt !== null) {
      Object.keys(toDos).filter((toDo) => toDo === addBoardPrompt).length === 0
        ? setToDos((allBoards) => {
            return { ...allBoards, [addBoardPrompt]: [] };
          })
        : alert("already exist");
    } else alert("생성 취소");
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
        <DeleteBoard
          width="64px"
          height="64px"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          ></path>
        </DeleteBoard>
      </Wrapper>
      <AddBoard
        onClick={handleAddBoard}
        width="64px"
        height="64px"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </AddBoard>
    </DragDropContext>
  );
}

export default App;
