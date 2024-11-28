export const ColorByTheme = {
  light: {
    headerBg: "rgb(255, 255, 255)",
    siderBg: "rgb(255, 255, 255)",
    triggerBg: "rgb(255, 255, 255)",
    triggerColor: "rgb(0,0,0)",
    footerBg: "rgb(255, 255, 255)",
    triggerHeight: 48,
  },
  dark: {
    headerBg: "rgb(28, 28, 28)",
    siderBg: "rgb(28, 28, 28)",
    triggerBg: "rgb(28, 28, 28)",
    triggerColor: "rgb(255, 255, 255)",
    footerBg: "rgb(28, 28, 28)",
    triggerHeight: 48,
  },
};

export const ThemeSetting = {
  theme: "light",
  header: {
    height: "var(--layout-header-height)",
    padding: "0 10px",
  },
  tab: {
    margin: "0",
    height: "var(--layout-tab-height)",
  },
  content: {
    height:
      "calc(100vh - var(--layout-header-height) - var(--layout-tab-height) - var(--layout-footer-height))",
    padding: "0 16px",
    border: "1px solid #e8e8e8",
    overflowY: "scroll",
  },
  sider: {
    width: "220px",
  },
  footer: {
    height: "var(--layout-footer-height))",
    textAlign: "center",
  },
  tokens: {
    light: {
      header: {},
      colors: {
        container: "rgb(255, 255, 255)",
        layout: "rgb(247, 250, 252)",
        inverted: "rgb(0, 20, 40)",
        "base-text": "rgb(31, 31, 31)",
      },
      boxShadow: {
        header: "0 1px 2px rgb(0, 21, 41, 0.08)",
        sider: "2px 0 8px 0 rgb(29, 35, 41, 0.05)",
        tab: "0 1px 2px rgb(0, 21, 41, 0.08)",
      },
    },
    dark: {
      colors: {
        container: "rgb(28, 28, 28)",
        layout: "rgb(18, 18, 18)",
        "base-text": "rgb(224, 224, 224)",
      },
    },
  },
};
