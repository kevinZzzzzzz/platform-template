export const ColorByTheme: IThemeProperty = {
  light: {
    headerBg: "rgb(255, 255, 255)",
    siderBg: "#001529",
    triggerBg: "#002140",
    triggerColor: "#fff",
    footerBg: "rgb(255, 255, 255)",
    triggerHeight: 48,
    tabsCardBg: "rgba(0,0,0, 0.01)",
  },
  dark: {
    headerBg: "rgb(28, 28, 28)",
    siderBg: "rgb(28, 28, 28)",
    triggerBg: "rgb(28, 28, 28)",
    triggerColor: "rgb(255, 255, 255)",
    footerBg: "rgb(28, 28, 28)",
    triggerHeight: 48,
    tabsCardBg: "rgba(255, 255, 255, 0.2)",
  },
};
export const ThemeByLocale = {
  zh: "zh",
  en: "en",
};
export const LocaleList = [
  {
    key: "1",
    label: "简体中文",
    value: "zh",
  },
  {
    key: "2",
    label: "English",
    value: "en",
  },
];
export const ThemeSetting: IThemeSetting = {
  locale: "zh",
  theme: "light",
  header: {
    height: "var(--layout-header-height)",
    lineHeight: "var(--layout-header-height)",
    padding: "0 10px",
    boxShadow: "10px 1px 2px rgb(0, 21, 41, 0.08)",
  },
  tab: {
    margin: "0",
    height: "var(--layout-tab-height)",
    boxShadow: "10px 1px 2px rgb(0, 21, 41, 0.08)",
  },
  content: {
    height:
      "calc(100vh - var(--layout-header-height) - var(--layout-tab-height) - var(--layout-footer-height))",
    overflowY: "hidden",
  },
  sider: {
    width: "220px",
    breakpoint: "md",
  },
  footer: {
    minHeight: "var(--layout-footer-height)",
    maxHeight: "var(--layout-footer-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--layout-footer-padding)",
  },
  tokens: {
    light: {},
    dark: {},
  },
};

export const AntdStyle: IThemeProperty = {
  Form: {
    itemMarginBottom: 12,
  },
  Modal: {
    titleFontSize: 18,
  },
  Table: {
    cellPaddingBlock: 10,
    cellPaddingInline: 10,
    cellFontSize: 12,
    rowHoverBg: "#d4e4ef",
    // headerBg: "#dddddd",
  },
  Tabs: {
    titleFontSizeSM: 12,
  },
  Menu: {
    light: {
      itemBg: "#001529",
      popupBg: "#001529",
      itemColor: "#bebec0",
      itemHoverBg: "#ffffff1a",
      itemHoverColor: "#bebec0",
      // itemSelectedBg: "#1677ff",
      // itemSelectedColor: "#fff",
    },
    dart: {
      itemBg: "#41464b",
      itemColor: "#bebec0",
      itemHoverBg: "#ffffff1a",
      itemHoverColor: "#bebec0",
      itemSelectedBg: "#a7b4c6",
      itemSelectedColor: "#fff",
    },
  },
  Button: {
    colorBgSolid: "rgb(76,168,36)",
    colorBgSolidActive: "rgb(76,168,36, 0.95)",
    colorBgSolidHover: "rgb(76,168,36, 0.75)",
  },
};
export const AntdTokenStyleMap: IThemeProperty = {
  light: {
    colorBgContainer: "rgb(255, 255, 255)",
    colors: {
      container: "rgb(255, 255, 255)",
      layout: "rgb(247, 250, 252)",
      inverted: "rgb(0, 20, 40)",
      "base-text": "rgb(31, 31, 31)",
    },
    boxShadow: {
      header: "10 1px 2px rgb(0, 21, 41, 0.08)",
      sider: "2px 0 8px 0 rgb(29, 35, 41, 0.05)",
      tab: "0 1px 2px rgb(0, 21, 41, 1)",
    },
    bgColorDrawer: "#f5f6f9",
  },
  dark: {
    colorBgContainer: "rgb(28, 28, 28)",
    colors: {
      container: "rgb(28, 28, 28)",
      layout: "rgb(18, 18, 18)",
      "base-text": "rgb(224, 224, 224)",
    },
    boxShadow: {
      header: "10 1px 2px rgb(0, 21, 41, 0.08)",
      sider: "2px 0 8px 0 rgb(29, 35, 41, 0.05)",
      tab: "0 1px 2px rgb(0, 21, 41, 1)",
    },
    bgColorDrawer: "rgb(28, 28, 28)",
  },
};

export const AntdTokenStyle = {
  colorPrimary: "#1677ff",
  colorLink: "#1677ff",
  colorError: "#ff4d4f",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorInfo: "#1677ff",
};
