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
        text: 'Wallet',
        path: '/wallet',
      },
      {
        text: 'My lessons',
        path: 'lesson/my-lessons-planner',
      },
      {
        text: 'My reviews',
        path: 'review/show',
        fromMenu: 'true',
      },
      {
        text: 'Chat',
        path: '',
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
      },
      {
        text: 'Wallet',
        path: '/wallet',
      },
      {
        text: 'My reviews',
        path: 'review/show',
        fromMenu: 'true',
      },
      {
        text: 'Chat',
        path: '',
      },
    ],
  },
];
