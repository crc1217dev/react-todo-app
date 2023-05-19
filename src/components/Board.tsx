import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDoState, ITodo, orderState, toDoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import EditButton from "./EditButton";

const Wrapper = styled.div`
  padding: 10px 0px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.afterBoardDrag
      : props.isDraggingFromThis
      ? props.theme.beforeBoardDrag
      : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const TitleArea = styled.div`
  display: flex;
  border-bottom: 2px solid white;
  margin-bottom: 5px;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  width: max-content;
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  margin: 0 auto;
  flex: 1;
`;
const TitleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteButton = styled.svg`
  width: 24px;
  height: 24px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    padding: 4px;
    &:hover {
      background-color: rgba(132, 132, 132, 0.027);
    }
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const [toDoOrder, setToDoOrder] = useRecoilState(orderState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  //삭제 버튼 클릭 시
  const onDeleteButtonClick = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("삭제하시겠습니까?");

    if (result) {
      // 1. order 배열을 삭제한 기준으로 변경 후 저장
      setToDoOrder((prevOrder) =>
        prevOrder.filter((_, prevIndex) => index !== prevIndex)
      );
      // 2. 삭제 버튼을 누른 boardId 값을 제외한 나머지만 리스트에 담기.
      setToDos((prevBoard) => {
        const orderedBoard: IToDoState = {};
        toDoOrder.map((key) =>
          key === boardId
            ? console.log(boardId)
            : (orderedBoard[key] = prevBoard[key])
        );
        return orderedBoard;
      });
    }
  };

  //ToDo생성
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <TitleArea>
            <Title>{boardId}</Title>
            <TitleButtonWrapper>
              <EditButton type={"BOARD"} />
              <DeleteButton
                onClick={onDeleteButtonClick}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </DeleteButton>
            </TitleButtonWrapper>
          </TitleArea>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", {
                required: true,
              })}
              type="text"
              placeholder={`Add Task On ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId} direction="vertical">
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}
export default Board;
