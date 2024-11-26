import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const LayoutSlice = createSlice({
  name: 'Layout',
  initialState: {
    pagePath: '',
    menuList: [],
    flatMenu: [], // 扁平处理的菜单
    headerTabList: [{ label: '首页', path: '/home',  key: '1' }], // 顶部tab栏
    activeTabkey: '1',  // 当前激活的页面key
    activePathInfo: {} // 当前激活的页面信息
  },
  reducers: {
    changeActivePath(state: any, {payload}) {
      state.activePathInfo = payload.activePathInfo
    },
    changeActiveTabKey(state: any, {payload}) {
      state.activeTabkey = payload.activeTabkey
    },
    changeFlatMenu(state: any, {payload}) {
      state.flatMenu = payload.flatMenu
    },
    changeHeaderTabList(state, {payload}) {
      state.headerTabList = payload.headerTabList
    },
    changePagePath(state, {payload}) {
      state.pagePath = payload.pagePath
    },
    changeMenuList(state, {payload}) {
      state.menuList = payload.menuList
    },
  }
})

export const { changeHeaderTabList, changePagePath, changeFlatMenu,changeActiveTabKey, changeActivePath, changeMenuList } = LayoutSlice.actions
export default LayoutSlice.reducer