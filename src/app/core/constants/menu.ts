import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Analytics',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard/analytics',
        },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
      ],
    },
    {
      group: 'Campaigns',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/horn.svg',
          label: 'Primary Campaigns',
          route: '/dashboard/primary-campaigns',
        },
        {
          icon: 'assets/icons/outline/horn1.svg',
          label: 'Secondary Campaigns',
          route: '/dashboard/secondary-campaigns',
        },
        // {
        //   icon: 'assets/icons/outline/users.svg',
        //   label: 'Users',
        //   route: '/users',
        // },
      ],
    },
    {
      group: 'Transactions',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/money.svg',
          label: 'Expenditure',
          route: '/dashboard/expenditure',
        },
        // {
        //   icon: 'assets/icons/outline/rev.svg',
        //   label: 'Revenue',
        //   route: '/dashboard/revenue',
        // },
      ],
    },
    {
      group: 'Settings',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Team Members',
          route: '/dashboard/team',
        },
        {
          icon: 'assets/icons/outline/role.svg',
          label: 'Roles',
          route: '/dashboard/roles',
        },
        {
          icon: 'assets/icons/outline/api.svg',
          label: 'Api Key',
          route: '/dashboard/api-key',
        },
      ],
    },
  ];
}
