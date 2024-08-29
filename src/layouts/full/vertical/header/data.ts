// Notifications dropdown

interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
}

const notifications: notificationType[] = [
  {
    avatar: '/images/profile/user-5.jpg',
    title: 'Michael se juntou a equipe!',
    subtitle: 'Parabéns e boas-vindas',
  },
  {
    avatar: '/images/profile/user-2.jpg',
    title: 'Nova mensagem de Salma',
    subtitle: 'Salma enviou uma mensagem',
  },
  {
    avatar: '/images/profile/user-3.jpg',
    title: 'Pagamento recebido',
    subtitle: 'Verifique seus ganhos',
  },
  {
    avatar: '/images/profile/user-4.jpg',
    title: 'João completou suas tarefas',
    subtitle: 'Atribua novas tarefas a ele',
  },
  {
    avatar: '/images/profile/user-4.jpg',
    title: 'Roman Joined the Team!',
    subtitle: 'Parabéns e boas-vindas',
  },
  {
    avatar: '/images/profile/user-2.jpg',
    title: 'Nova mensagem de Salma',
    subtitle: 'Salma enviou uma mensagem',
  },
  {
    avatar: '/images/profile/user-3.jpg',
    title: 'Pagamento recebido',
    subtitle: 'Verifique seus ganhos',
  },
  {
    avatar: '/images/profile/user-4.jpg',
    title: 'João completou suas tarefas',
    subtitle: 'Atribua novas tarefas a ele',
  },
];

interface appsLinkType {
  href: string;
  title: string;
  subtext: string;
  avatar: string;
}

const appsLink: appsLinkType[] = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'New messages arrived',
    avatar: '/images/svgs/icon-dd-chat.svg',
  },
  {
    href: '/apps/ecommerce/shop',
    title: 'eCommerce App',
    subtext: 'New stock available',
    avatar: '/images/svgs/icon-dd-cart.svg',
  },
  {
    href: '/apps/notes',
    title: 'Notes App',
    subtext: 'To-do and Daily tasks',
    avatar: '/images/svgs/icon-dd-invoice.svg',
  },
  {
    href: '/apps/calendar',
    title: 'Calendar App',
    subtext: 'Get dates',
    avatar: '/images/svgs/icon-dd-date.svg',
  },
  {
    href: '/apps/contacts',
    title: 'Contact Application',
    subtext: '2 Unsaved Contacts',
    avatar: '/images/svgs/icon-dd-mobile.svg',
  },
  {
    href: '/apps/tickets',
    title: 'Tickets App',
    subtext: 'Submit tickets',
    avatar: '/images/svgs/icon-dd-lifebuoy.svg',
  },
  {
    href: '/apps/email',
    title: 'Email App',
    subtext: 'Get new emails',
    avatar: '/images/svgs/icon-dd-message-box.svg',
  },
  {
    href: '/apps/blog/post',
    title: 'Blog App',
    subtext: 'added new blog',
    avatar: '/images/svgs/icon-dd-application.svg',
  },
];

interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [];

export { notifications, pageLinks, appsLink };
