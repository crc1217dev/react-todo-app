import styled from "styled-components";

export interface ModalStyle {
  isOpen: boolean;
}
export const StyledModal = styled.div<ModalStyle>`
  display: ${(props) => (props.isOpen ? "" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  section {
    width: 90%;
    max-width: 450px;
    margin: 25% auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: ${(props) => (props.isOpen ? "modal-show" : "modal-close")} 0.5s;
    overflow: hidden;
  }
  section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: ${(props) => props.theme.boardColor};
    font-weight: 700;
  }
  section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  section > footer button {
    padding: 8px 14px;
    color: #fff;
    background-color: #8ecfcf;
    border-radius: 5px;
    font-size: 13px;
    margin-inline-start: 16px;
    &:hover {
      background-color: #a1e7e7;
    }
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    /* animation: modal-bg-show 0.3s; */
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: 0;
    }
    to {
      opacity: 1;
      margin-top: 25%;
    }
  }
  @keyframes modal-close {
    from {
      opacity: 1;
      margin-top: 25%;
    }
    to {
      opacity: 0;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
