import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ColorByTheme, ThemeSetting } from "@/constants/theme";
export const LayoutSlice = createSlice({
  name: "Layout",
  initialState: {
    ...ThemeSetting,
    collapsed: false,
  },
  reducers: {
    // 张开闭合sider
    changeCollapsed(state: any, { payload }) {
      state.collapsed = payload.collapsed;
    },
    // 切换主题
    changeTheme(state: any, { payload }) {
      state.theme = payload.theme;
    },
  },
});

export const { changeCollapsed, changeTheme } = LayoutSlice.actions;
export default LayoutSlice.reducer;
