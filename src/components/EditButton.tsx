import styled from "styled-components";

const Button = styled.svg<IEditProps>`
  width: ${({ type }) => (type === "CARD" ? "16px" : "20px")};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
interface IEditProps {
  type: string;
}
function EditButton({ type }: IEditProps) {
  const handleButtonOnclick = () => {};

  return (
    <Button
      type={type}
      onClick={handleButtonOnclick}
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      ></path>
    </Button>
  );
}

export default EditButton;
