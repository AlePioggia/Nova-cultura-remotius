export const studentNavigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Menu',
    icon: 'folder',
    items: [
      {
        text: 'My lessons',
        path: 'lesson/my-lessons-planner',
        icon: 'event',
      },
      {
        text: 'My reviews',
        path: 'review/show',
        fromMenu: 'true',
        icon: 'rename',
      },
      {
        text: 'Wallet',
        path: '/wallet',
        icon: 'money',
      },
      {
        text: 'Reservations',
        path: '/wallet/reservations',
        icon: 'bulletlist',
      },
    ],
  },
];

export const teacherNavigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Menu',
    icon: 'folder',
    items: [
      {
        text: 'Lessons',
        path: '/lesson',
        icon: 'event',
      },
      {
        text: 'My reviews',
        path: 'review/show',
        fromMenu: 'true',
        icon: 'rename',
      },
      {
        text: 'Wallet',
        path: '/wallet',
        icon: 'money',
      },
      {
        text: 'Reservations',
        path: '/wallet/reservations',
        icon: 'bulletlist',
      },
    ],
  },
];
