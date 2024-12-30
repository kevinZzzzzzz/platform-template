import { requireImg } from "@/utils";
import { CloudOutlined } from "@ant-design/icons";

export class ImportMenu {
  icon: string;
  key: string;
  label: string;
  path: string;
  menukey: string;
  title: string;
  children: ImportMenu[];
  constructor(pros: any) {
    this.icon = pros.icon;
    this.key = pros.key;
    this.label = pros.name;
    this.path = pros.path;
    this.title = pros.name;
    this.menukey = pros.menukey;
    this.children = pros.children;
  }
}
export const importProjectList = [
  {
    name: "冷链云",
    projectName: "ColdChainWeb",
    image: requireImg("/src/assets/ColdChainLogo.png"),
    key: "ColdChainWeb",
    path: "/ColdChainWeb/home",
    layout: "layout.base",
    meta: {
      needShow: true,
      icon: "CloudOutlined",
      i18nKey: "冷链云",
      keepAlive: true,
      menuKey: "2",
      title: "冷链云",
      order: 1,
    },
  },
  {
    name: "空地一体",
    projectName: "ColdChainScreen",
    image: requireImg("/src/assets/SendUavIcon.png"),
    key: "ColdChainScreen",
    path: "/ColdChainScreen/",
    layout: "layout.base",
    meta: {
      needShow: true,
      icon: "CloudOutlined",
      i18nKey: "空地一体",
      keepAlive: true,
      menuKey: "2",
      title: "空地一体",
      order: 1,
    },
  },
];

export const importPluginList = [
  {
    key: 1,
    name: "Plugin 1",
    shortName: "P1",
    description: "This is plugin 1",
    icon: "",
    path: "/plugin/p1.js",
  },
  {
    key: 2,
    name: "Plugin 2",
    shortName: "P2",
    description: "This is plugin 2",
    icon: "",
    path: "/plugin/p2.js",
  },
  {
    key: 3,
    name: "Plugin 3",
    shortName: "P3",
    description: "This is plugin 3",
    icon: "",
    path: "/plugin/p3.js",
  },
  {
    key: 4,
    name: "Plugin 4",
    shortName: "P4",
    description: "This is plugin 4",
    icon: "",
    path: "/plugin/p4.js",
  },
  {
    key: 5,
    name: "Plugin 5",
    shortName: "P5",
    description: "This is plugin 5",
    icon: "",
    path: "/plugin/p5.js",
  },
  {
    key: 6,
    name: "Plugin 6",
    shortName: "P6",
    description: "This is plugin 6",
    icon: "",
    path: "/plugin/p6.js",
  },
  {
    key: 7,
    name: "Plugin 7",
    shortName: "P7",
    description: "This is plugin 7",
    icon: "",
    path: "/plugin/p7.js",
  },
  {
    key: 8,
    name: "Plugin 8",
    shortName: "P8",
    description: "This is plugin 8",
    icon: "",
    path: "/plugin/p8.js",
  },
  {
    key: 9,
    name: "Plugin 9",
    shortName: "P9",
    description: "This is plugin 9",
    icon: "",
    path: "/plugin/p9.js",
  },
  {
    key: 10,
    name: "Plugin 10",
    shortName: "P10",
    description: "This is plugin 10",
    icon: "",
    path: "/plugin/p10.js",
  },
];
