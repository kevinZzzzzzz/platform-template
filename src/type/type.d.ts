type GeneratedRoute = {
  key: number;
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
  };
  children?: GeneratedRoute[];
};
