import { NOT_USER_AND_TEACHER } from './../shared/constants/roles.constants';
export const navItems = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'icon-speedometer',
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
    key: 'userManagement.navName',
    authorities: NOT_USER_AND_TEACHER
  },
  {
    name: 'Quản lý vai trò',
    url: '/admin/role-management',
    icon: 'icon-people',
    key: 'roleManagement.navName',
    authorities: ['ROLE_BOSS']
  },
  {
    name: 'Quản lý quyền hạn',
    url: '/admin/permission-management',
    icon: 'icon-people',
    key: 'permissionManagement.navName',
    authorities: ['ROLE_BOSS']
  },
  {
    name: 'Quản lý khóa học',
    url: '/admin/course-management',
    icon: 'icon-people',
    key: 'courseManagement.navName'
  }
];
