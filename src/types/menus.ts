export type getMenusType = {
  id: string;
  name: string;
  route: string;
  icon: string;
  order: string;
  children: childrenGetMenu[];
};

type childrenGetMenu = {
  id: string;
  name: string;
  route: string;
  icon: string;
  order: string;
};
