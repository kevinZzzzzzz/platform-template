import {
  AntdStyle,
  AntdTokenStyle,
  AntdTokenStyleMap,
  ColorByTheme,
} from "@/constants/theme";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const siderDeepStyleMap = {
  true: {
    ColorByTheme: {
      light: {
        siderBg: "#001529",
        triggerBg: "#002140",
        triggerColor: "#fff",
      },
    },
    AntdStyle: {
      Menu: {
        light: {
          itemBg: "#001529",
          popupBg: "#001529",
          itemColor: "#bebec0",
          itemHoverBg: "#ffffff1a",
          itemHoverColor: "#bebec0",
        },
      },
    },
  },
  false: {
    ColorByTheme: {
      light: {
        siderBg: "#fff",
        triggerBg: "#ddd",
        triggerColor: "#000",
      },
    },
    AntdStyle: {
      Menu: {
        light: {
          itemBg: "#fff",
          popupBg: "#fff",
          itemColor: "#000",
          itemHoverBg: "#ddd",
          itemHoverColor: "#000",
        },
      },
    },
  },
};
export const ThemeSlice = createSlice({
  name: "Theme",
  initialState: {
    ColorByTheme,
    AntdStyle,
    AntdTokenStyleMap,
    AntdTokenStyle,
    greyMode: false,
    colorWeaknessMode: false,
    siderDeepFlag: true,
    extendedPageBackground: "#4d707b",
  },
  reducers: {
    changeGreyMode(state: any, { payload }) {
      state.greyMode = payload.greyMode;
    },
    changeColorWeaknessMode(state: any, { payload }) {
      state.colorWeaknessMode = payload.colorWeaknessMode;
    },
    changeSiderDeepFlag(state: any, { payload }) {
      state.siderDeepFlag = payload.siderDeepFlag;
      state.ColorByTheme = {
        ...state.ColorByTheme,
        ...siderDeepStyleMap[payload.siderDeepFlag].ColorByTheme,
      };
      state.AntdStyle = {
        ...state.AntdStyle,
        ...siderDeepStyleMap[payload.siderDeepFlag].AntdStyle,
      };
    },
    changeAntdTokenStyle(state: any, { payload }) {
      state.AntdTokenStyle = {
        ...state.AntdTokenStyle,
        ...payload.AntdTokenStyle,
      };
    },
    changeExtendedPageBackground(state: any, { payload }) {
      state.extendedPageBackground = payload.extendedPageBackground;
    },
  },
});

export const {
  changeGreyMode,
  changeColorWeaknessMode,
  changeSiderDeepFlag,
  changeAntdTokenStyle,
  changeExtendedPageBackground,
} = ThemeSlice.actions;
export default ThemeSlice.reducer;
