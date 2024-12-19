import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ColorByTheme, ThemeSetting } from "@/constants/theme";

export const LayoutSlice = createSlice({
  name: "Layout",
  initialState: {
    ...ThemeSetting,
    collapsed: false,
    fullScreen: false,
    // { label: "首页", path: "/home", key: "0" }
    headerTabList: [
      { label: "首页", path: "/home", key: "0", closable: false },
    ], // 顶部tab栏
    activeTabKey: "1", // 当前激活的页面key
    activePathInfo: {}, // 当前激活的页面信息
    menuKey: "1", // 顶部菜单Key
    pluginList: [], // 插件列表
    projectList: [], // 项目列表
  },
  reducers: {
    // 张开闭合sider
    changeCollapsed(state: any, { payload }) {
      state.collapsed = payload.collapsed;
    },
    // 全屏
    changeFullScreen(state: any, { payload }) {
      state.fullScreen = payload.fullScreen;
      if (!payload.fullScreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
    // 切换主题
    changeTheme(state: any, { payload }) {
      state.theme = payload.theme;
    },
    // 切换语言
    changeLocale(state: any, { payload }) {
      state.locale = payload.locale;
    },
    // 当前激活的path信息
    changeActivePath(state: any, { payload }) {
      state.activePathInfo = payload.activePathInfo;
    },
    // 切换tab栏key
    changeActiveTabKey(state: any, { payload }) {
      state.activeTabKey = payload.activeTabKey;
    },
    // 切换tab栏列表
    changeHeaderTabList(state, { payload }) {
      if (payload.headerTabList) {
        payload.headerTabList.forEach((item) => {
          item.closable = +item.key != 0;
        });
        state.headerTabList = payload.headerTabList;
      }
    },
    // 切换一级菜单
    changeMenuKey(state, { payload }) {
      state.menuKey = payload.menuKey;
    },
    // 更新项目列表
    updateProjectList(state, { payload }) {
      state.projectList = payload.projectList;
    },
    // 更新插件列表
    updatePluginList(state, { payload }) {
      state.pluginList = payload.pluginList;
    },
  },
});

export const {
  changeCollapsed,
  changeTheme,
  changeFullScreen,
  changeLocale,
  changeActivePath,
  changeActiveTabKey,
  changeHeaderTabList,
  changeMenuKey,
  updateProjectList,
  updatePluginList,
} = LayoutSlice.actions;
export default LayoutSlice.reducer;
