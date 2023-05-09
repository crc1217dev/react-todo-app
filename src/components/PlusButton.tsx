import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { orderState, toDoState } from "../atoms";

const SvgButton = styled.svg`
  position: absolute;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  filter: ${(props) => props.theme.svgShadow};
`;
function PlusButton() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [order, setOrder] = useRecoilState(orderState);

  const setBoardValue = (promptInput: string) => {
    setOrder((prevValue) => [...prevValue, promptInput]);
    setToDos((allBoards) => {
      return { ...allBoards, [promptInput]: [] };
    });
    console.log(toDos, order);
  };
  const handleAddBoard = () => {
    const addBoardPrompt = prompt(
      "추가할 보드의 제목을 입력해 주세요.",
      "ToDo List"
    );
    if (addBoardPrompt !== null) {
      Object.keys(toDos).filter((boardId) => boardId === addBoardPrompt)
        .length === 0
        ? setBoardValue(addBoardPrompt)
        : alert("already exist");
    } else alert("생성 취소");
  };
  return (
    <SvgButton
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
    </SvgButton>
  );
}

export default PlusButton;
