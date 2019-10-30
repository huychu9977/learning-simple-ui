export const navItems = [
  {
    name: 'Dashboard',
    url: 'dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
    key: 'global.dashboard.navName'
  },
  {
    title: true,
    name: 'Quản lý',
  },
  {
    name: 'Quản lý người dùng',
    url: '/admin/user-management',
    icon: 'icon-people',
    key: 'userManagement.navName'
  },
  {
    name: 'Quản lý vai trò',
    url: '/admin/role-management',
    icon: 'icon-people',
    key: 'roleManagement.navName',
    authorities: ['ROLE_ADMIN']
  },
  {
    name: 'Quản lý quyền hạn',
    url: '/admin/permission-management',
    icon: 'icon-people',
    key: 'permissionManagement.navName'
  },
  {
    name: 'Quản lý khóa học',
    url: '/admin/course-management',
    icon: 'icon-people',
    key: 'courseManagement.navName'
  }
];
