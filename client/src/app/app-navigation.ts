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
        text: 'Chat',
        path: '',
      },
    ],
  },
];
