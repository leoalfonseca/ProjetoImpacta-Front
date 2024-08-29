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
import {
  IconCalendar,
  IconDashboard,
  IconUserCircle,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Menu',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/home',
  },
  {
    id: uniqueId(),
    title: 'Usuários',
    icon: IconUserCircle,
    href: '/admin/users',
  },
  {
    id: uniqueId(),
    title: 'Calendário',
    icon: IconCalendar,
    href: '/calendar',
  },
];

export default Menuitems;
