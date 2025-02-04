export const generatedRoutes: GeneratedRoute[] = [
  {
    key: "0",
    name: "Home",
    path: "/home",
    layout: "layout.base",
    component: "pages.home",
    meta: {
      title: "home",
      i18nKey: "home",
      icon: "AppstoreOutlined",
      keepAlive: true,
      order: 0,
      needShow: true,
      menuKey: "1",
    },
  },
  {
    key: "1",
    name: "About",
    path: "/about",
    layout: "layout.base",
    component: "pages.about",
    meta: {
      title: "about",
      i18nKey: "about",
      icon: "DesktopOutlined",
      keepAlive: true,
      order: 1,
      needShow: true,
      menuKey: "1",
    },
  },
  {
    key: "2",
    name: "Exception",
    path: "/exception",
    layout: "layout.base",
    meta: {
      title: "exception",
      i18nKey: "exception",
      icon: "RocketOutlined",
      order: 2,
      needShow: true,
      menuKey: "1",
    },
    children: [
      {
        key: "201",
        name: "403",
        path: "/exception/403",
        layout: "layout.base",
        component: "pages.exception.403",
        meta: {
          title: "403",
          i18nKey: "403",
          icon: "ExclamationCircleOutlined",
          keepAlive: true,
          order: 0,
          needShow: true,
          menuKey: "1",
        },
      },
      {
        key: "202",
        name: "404",
        path: "/exception/404",
        layout: "layout.base",
        component: "pages.exception.404",
        meta: {
          title: "404",
          i18nKey: "404",
          icon: "CloseCircleOutlined",
          keepAlive: true,
          order: 1,
          needShow: true,
          menuKey: "1",
        },
      },
      {
        key: "203",
        name: "500",
        path: "/exception/500",
        layout: "layout.base",
        component: "pages.exception.500",
        meta: {
          title: "500",
          i18nKey: "500",
          icon: "IssuesCloseOutlined",
          keepAlive: true,
          order: 2,
          needShow: true,
          menuKey: "1",
        },
      },
    ],
  },
  {
    key: "3",
    name: "Exception1",
    path: "/exception1",
    layout: "layout.base",
    meta: {
      title: "exception",
      i18nKey: "exception1",
      icon: "RocketOutlined",
      order: 2,
      needShow: true,
      menuKey: "1",
    },
    children: [
      {
        key: "301",
        name: "403",
        path: "/exception1/403",
        layout: "layout.base",
        component: "pages.exception.403",
        meta: {
          title: "403",
          i18nKey: "403",
          icon: "ExclamationCircleOutlined",
          keepAlive: true,
          order: 0,
          needShow: true,
          menuKey: "1",
        },
      },
      {
        key: "302",
        name: "404",
        path: "/exception1/404",
        layout: "layout.base",
        component: "pages.exception.404",
        meta: {
          title: "404",
          i18nKey: "404",
          icon: "CloseCircleOutlined",
          keepAlive: true,
          order: 1,
          needShow: true,
          menuKey: "1",
        },
      },
      {
        key: "303",
        name: "500",
        path: "/exception1/500",
        layout: "layout.base",
        component: "pages.exception.500",
        meta: {
          title: "500",
          i18nKey: "500",
          icon: "IssuesCloseOutlined",
          keepAlive: true,
          order: 2,
          needShow: true,
          menuKey: "1",
        },
      },
    ],
  },
  {
    key: "4",
    name: "Table",
    path: "/table",
    layout: "layout.base",
    component: "pages.table",
    meta: {
      title: "table",
      i18nKey: "table",
      icon: "DesktopOutlined",
      keepAlive: true,
      order: 1,
      needShow: true,
      menuKey: "1",
    },
  },
  {
    key: "5",
    name: "Home",
    path: "/home2",
    layout: "layout.base",
    component: "pages.home",
    meta: {
      title: "home2",
      i18nKey: "home2",
      icon: "AppstoreOutlined",
      keepAlive: true,
      order: 0,
      needShow: true,
      menuKey: "2",
    },
  },
  {
    key: "6",
    name: "Exception2",
    path: "/exception2",
    layout: "layout.base",
    meta: {
      title: "exception",
      i18nKey: "exception2",
      icon: "RocketOutlined",
      order: 2,
      needShow: true,
      menuKey: "2",
    },
    children: [
      {
        key: "601",
        name: "403",
        path: "/exception2/403",
        layout: "layout.base",
        component: "pages.exception.403",
        meta: {
          title: "403",
          i18nKey: "403",
          icon: "ExclamationCircleOutlined",
          keepAlive: true,
          order: 0,
          needShow: true,
          menuKey: "2",
        },
      },
      {
        key: "602",
        name: "404",
        path: "/exception2/404",
        layout: "layout.base",
        component: "pages.exception.404",
        meta: {
          title: "404",
          i18nKey: "404",
          icon: "CloseCircleOutlined",
          keepAlive: true,
          order: 1,
          needShow: true,
          menuKey: "2",
        },
      },
      {
        key: "603",
        name: "500",
        path: "/exception2/500",
        layout: "layout.base",
        component: "pages.exception.500",
        meta: {
          title: "500",
          i18nKey: "500",
          icon: "IssuesCloseOutlined",
          keepAlive: true,
          order: 2,
          needShow: true,
          menuKey: "2",
        },
      },
    ],
  },
  {
    key: "7",
    name: "Form",
    path: "/form",
    layout: "layout.base",
    component: "pages.form",
    meta: {
      title: "form",
      i18nKey: "form",
      icon: "DesktopOutlined",
      keepAlive: true,
      order: 1,
      needShow: true,
      menuKey: "1",
    },
  },
  {
    key: "extendedPage",
    name: "ExtendedPage",
    path: "/extendedPage",
    layout: "layout.base",
    component: "pages.extendedPage",
    meta: {
      title: "extendedPage",
      i18nKey: "extendedPage",
      icon: "DesktopOutlined",
      keepAlive: true,
      order: 1,
      needShow: false,
      menuKey: "1",
    },
    children: [],
  },
  {
    key: "pluginTextPage",
    name: "PluginTextPage",
    path: "/pluginTextPage",
    layout: "layout.base",
    component: "pages.pluginTextPage",
    meta: {
      title: "pluginTextPage",
      i18nKey: "pluginTextPage",
      icon: "DesktopOutlined",
      keepAlive: true,
      order: 1,
      needShow: false,
      menuKey: "1",
    },
    children: [],
  },
  {
    key: "99",
    name: "Login",
    path: "/login",
    layout: "layout.blank",
    component: "pages.login",
    meta: {
      title: "login",
      i18nKey: "login",
      keepAlive: false,
      icon: "null",
      order: 0,
      needShow: false,
    },
  },
];
