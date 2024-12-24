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
// {
//   key: "coldChainWeb",
//   name: "ColdChainWeb",
//   path: "/ColdChainWeb",
//   layout: "layout.base",
//   meta: {
//     title: "coldChainWeb",
//     i18nKey: "coldChainWeb",
//     icon: "DesktopOutlined",
//     keepAlive: true,
//     order: 1,
//     needShow: true,
//     menuKey: "2",
//   },
//   children: [
//     {
//       key: "coldChainWeb-01",
//       name: "ColdChainWeb",
//       path: "/ColdChainWeb/home",
//       layout: "layout.base",
//       component: "pages.embedPage",
//       meta: {
//         title: "冷链云首页",
//         i18nKey: "冷链云首页",
//         icon: "",
//         keepAlive: true,
//         order: 1,
//         needShow: true,
//         menuKey: "2",
//       },
//     },
//   ],
// }
