import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { orderState, toDoSelector, toDoState } from "./atoms";
import Board from "./components/Board";
import TrashCan from "./components/TrashCan";
import PlusButton from "./components/PlusButton";

const Wrapper = styled.div`
  display: flex;
  max-width: 1224px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-wrap: nowrap;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
`;
function App() {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const setOrder = useSetRecoilState(orderState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, type, draggableId } = info;
    console.log(info);
    if (!destination) return;
    //Board 순서 변경
    if (type === "BOARD") {
      setOrder((prevOrder) => {
        const orderCopy = [...prevOrder];
        console.log(prevOrder);
        console.log(...orderCopy);
        orderCopy.splice(source.index, 1);
        orderCopy.splice(destination.index, 0, draggableId);
        console.log(prevOrder, orderCopy);
        return orderCopy;
      });
      return;
    }
    //삭제 용
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
    //게시판 내 Todo 이동
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
      // 다른 게시판 ToDo 이동
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
        <Droppable droppableId="Board" direction="horizontal" type="BOARD">
          {(magic, snapshot) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  key={boardId}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                ></Board>
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
      </Wrapper>
      <PlusButton />
    </DragDropContext>
  );
}

export default App;
