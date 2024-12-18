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
    path: "/ColdChainWeb",
    menukey: "2",
    icon: <CloudOutlined />,
    children: [
      {
        name: "冷链云首页",
        key: "ColdChainWeb-01",
        menukey: "2",
        path: "/ColdChainWeb/home",
      },
    ],
  },
];
