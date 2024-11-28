type GeneratedRoute = {
  key: string;
  path: string;
  name: string;
  component?: string;
  layout: string;
  meta: {
    title: string;
    i18nKey?: string;
    order: number;
    icon: string;
    keepAlive?: boolean;
    roles?: string[];
    needShow: boolean;
  };
  children?: GeneratedRoute[];
};
