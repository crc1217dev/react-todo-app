import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

function CCategory() {
  const Container = styled.div`
    display: flex;
  `;
  const [categories, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ category }: IForm) => {
    setValue("category", "");
  };

  return (
    <Container>
      <select onInput={onInput} name="" id="">
        <option value={"TO_DO"}>To Do</option>
        <option value={"DOING"}>Doing</option>
        <option value={"DONE"}>Done</option>
        {}
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("category", {
            required: "Please write a category",
          })}
          type="text"
        />
      </form>
    </Container>
  );
}
export default CCategory;
