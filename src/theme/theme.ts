import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    colors: {
      todoBackground: string;
    };
    zIndexes: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modalBackdrop: number;
      offcanvas: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    todoBackground: "gray",
  },
  zIndexes: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    offcanvas: 1050,
    modal: 1060,
    popover: 1070,
    tooltip: 1080,
  },
};
