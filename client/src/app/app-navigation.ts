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
      },
      {
        text: 'My reviews',
        path: 'review/show',
        fromMenu: 'true',
      },
      {
        text: 'Wallet',
        path: '/wallet',
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
        text: 'My reviews',
        path: 'review/show',
        fromMenu: 'true',
      },
      {
        text: 'Wallet',
        path: '/wallet',
      },
    ],
  },
];
