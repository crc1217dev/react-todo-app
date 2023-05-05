import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}
export interface IBoardState {
  [key: string]: IToDoState[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {},
});

export const boardState = atom<IBoardState>({
  key: "Boards",
  default: {},
});

// export const boardSelector = selector({
//   key: "boardSelector",
//   get: ({get}) => {
//     const toDos = get(toDoState);
//     const Boards = get(boardState);
//   }
// })
