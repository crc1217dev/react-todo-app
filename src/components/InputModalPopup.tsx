import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDoState, modalState, orderState, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { StyledModal } from "../common/StyledModal";
import styled from "styled-components";

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
interface IForm {
  formValue: string;
}
function InputModalPopup() {
  const [{ isOpen, type, formValue, boardId, id, index }, setModalState] =
    useRecoilState(modalState);
  const [toDoOrder, setOrder] = useRecoilState(orderState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IForm>();

  const onCloseClick = () => {
    setModalState(({ isOpen, type }) => ({
      isOpen: !isOpen,
      type: type,
      formValue: "",
      id: null,
      boardId: null,
      index: 0,
    }));
  };
  const onValid = ({ formValue }: IForm) => {
    if (!boardId) throw new Error("boardId is Null");
    if (type === "BOARD") {
      setOrder((prevOrder) => {
        const editedArray = [...prevOrder];
        editedArray.splice(index, 1, formValue);
        return editedArray;
      });
      setToDos((prevToDos) => {
        const orderedBoard: IToDoState = {};
        toDoOrder.map((order, orderIndex) => {
          if (orderIndex === index) {
            orderedBoard[formValue] = prevToDos[boardId];
          } else {
            orderedBoard[order] = prevToDos[order];
          }
          return orderedBoard;
        });
        console.log(orderedBoard);
        return orderedBoard;
      });
    } else if (type === "CARD") {
      if (!id) throw new Error("ToDoId is null");
      console.log("card start :", formValue, type, id, index, boardId);
      setToDos((prevToDos) => {
        const editedBoard = [...prevToDos[boardId]];
        editedBoard.splice(index, 1, { id: +id, text: formValue });
        console.log(editedBoard);
        return {
          ...prevToDos,
          [boardId]: editedBoard,
        };
      });
    }

    onCloseClick();
    // 수정 잘 되니까 수정한 후에 액션 추가 필요
  };
  return (
    <StyledModal
      isOpen={isOpen}
      className={isOpen ? "openModal modal" : "modal"}
    >
      {isOpen ? (
        <section>
          <header>
            {type === "CARD" ? "toDo 수정" : "BOARD 수정"}
            <button className="close" onClick={onCloseClick}>
              &times;
            </button>
          </header>
          <main>
            <Form id="inputForm" onSubmit={handleSubmit(onValid)}>
              <input
                {...register("formValue", {
                  required: "공백을 남길 순 없습니다.",
                  value: formValue,
                  shouldUnregister: true,
                })}
                type="text"
              />
            </Form>
          </main>
          <footer>
            <button type="submit" form="inputForm">
              확인
            </button>
            <button className="close" onClick={onCloseClick}>
              취소
            </button>
          </footer>
        </section>
      ) : null}
    </StyledModal>
  );
}

export default InputModalPopup;
