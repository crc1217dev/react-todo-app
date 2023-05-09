import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

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

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const order = get(orderState);
    const orderedToDos: IToDoState = {};
    order.map((key) => {
      orderedToDos[key] = toDos[key];
    });
    console.log(orderedToDos);
    return orderedToDos;
  },
});
