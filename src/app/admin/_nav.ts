import { NOT_USER_AND_TEACHER, NOT_USER } from './../shared/constants/roles.constants';
export const navItems = [
  {
    name: 'Thống kê',
    url: '/admin/statistical',
    icon: 'fa-bar-chart',
    key: 'global.statistical.navName',
    authorities: NOT_USER
  },
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'fa-rocket',
    key: 'global.dashboard.navName',
    authorities: NOT_USER_AND_TEACHER
  },
  {
    title: true,
    name: 'Quản lý',
  },
  {
    name: 'Quản lý thông báo',
    url: '/admin/notification-management',
    icon: 'fa-bell-o',
    key: 'notificationManagement.navName',
    authorities: NOT_USER_AND_TEACHER
  },
  {
    name: 'Quản lý sự kiện',
    url: '/admin/event-management',
    icon: 'fa-calendar',
    key: 'eventManagement.navName',
    authorities: NOT_USER_AND_TEACHER
  },
  {
    name: 'Quản lý người dùng',
    url: '/admin/user-management',
    icon: 'fa-user-circle-o',
    key: 'userManagement.navName',
    authorities: NOT_USER_AND_TEACHER
  },
  {
    name: 'Quản lý khóa học',
    url: '/admin/course-management',
    icon: 'fa-book',
    key: 'courseManagement.navName',
    authorities: NOT_USER
  },
  {
    name: 'Quản lý danh mục',
    url: '/admin/category-management',
    icon: 'fa-bars',
    key: 'categoryManagement.navName',
    authorities: ['ROLE_BOSS']
  },
  {
    name: 'Quản lý vai trò',
    url: '/admin/role-management',
    icon: 'fa-low-vision',
    key: 'roleManagement.navName',
    authorities: ['ROLE_BOSS']
  },
  {
    name: 'Quản lý quyền hạn',
    url: '/admin/permission-management',
    icon: 'fa-low-vision',
    key: 'permissionManagement.navName',
    authorities: ['ROLE_BOSS']
  }
];
