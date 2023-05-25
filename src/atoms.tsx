import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
export interface IModal {
  isOpen: boolean;
  type: "BOARD" | "CARD";
  //toDo 중복 확인 ID(생성일)
  id: string | null;
  formValue: string;
  index: number;
  //Board 식별 확인
  boardId: string | null;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

// localStorage에 저장
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    console.log(savedValue);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {},
  effects: [localStorageEffect("toDo")],
});

export const orderState = atom<string[]>({
  key: "order",
  default: [],
  effects: [localStorageEffect("order")],
});
export const modalState = atom<IModal>({
  key: "modalOpen",
  default: {
    isOpen: false,
    type: "BOARD",
    formValue: "",
    id: "",
    index: 0,
    boardId: null,
  },
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const order = get(orderState);
    const orderedToDos: IToDoState = {};
    order.map((key) => (orderedToDos[key] = toDos[key]));
    console.log("ordered on recoils:", orderedToDos);
    return orderedToDos;
  },
});
