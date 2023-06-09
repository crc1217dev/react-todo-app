// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    boardColor: string;
    accentColor: string;
    cardBgColor: string;
    beforeBoardDrag: string;
    afterBoardDrag: string;
    svgShadow: string;
  }
}
