import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

interface BackendMenuItem {
  menuName: string;
  menuRoute: string;
  menuIcon: string;
  menuOrder: string;
  hasParent: boolean;
  hasChildren: boolean;
  children?: BackendMenuItem[];
}

const convertBackendMenuToMenuItems = (
  backendMenu: BackendMenuItem[]
): MenuitemsType[] => {
  return (
    backendMenu &&
    backendMenu.map((item) => {
      const menuItem: MenuitemsType = {
        id: uniqueId(),
        title: item.menuName,
        icon: item.menuIcon,
        href: item.menuRoute,
        children: item.hasChildren
          ? convertBackendMenuToMenuItems(item.children || [])
          : undefined,
      };

      return menuItem;
    })
  );
};

export { convertBackendMenuToMenuItems };
