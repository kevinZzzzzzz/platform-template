declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}
declare module "remoteMain/CommonNavComp" {
  import { ComponentType } from "react";
  const CommonNavComp: ComponentType<any>;
  export default CommonNavComp;
}
declare module "remoteMain/AboutPage" {
  import { ComponentType } from "react";
  const AboutPage: ComponentType<any>;
  export default AboutPage;
}
