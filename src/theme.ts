import { DefaultTheme } from "styled-components";
export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "white",
  accentColor: "#9c88ff",
  cardBgColor: "transparent",
  boardColor: "#616161",
  beforeBoardDrag: "white",
  afterBoardDrag: "white",
  svgShadow: "drop-shadow(2px 3.5px 1.5px rgb(0 0 0 / 0.4))",
};

//

export const lightTheme: DefaultTheme = {
  bgColor:
    "linear-gradient(52deg, rgba(181,225,238,1) 0%, rgba(142,208,177,0.9) 89%)",
  textColor: "#40514E",
  accentColor: "rgb(142, 208, 177, 0.7)",
  cardBgColor: "rgba(203, 241, 245, 0.8)",
  boardColor: "#E3FDFD",
  beforeBoardDrag: "#f5d7b3",
  afterBoardDrag: "#9cf3f3",
  svgShadow: "drop-shadow(2px 3.5px 1.5px rgb(0 0 0 / 0.4))",
};
