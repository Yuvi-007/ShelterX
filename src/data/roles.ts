import {
  BarChart3,
  BellRing,
  CircleUserRound,
  Home,
  LayoutDashboard,
  MapPinned,
  Settings,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

export type RoleId =
  | 'citizen'
  | 'manager'
  | 'response'
  | 'authority'
  | 'admin';

export type RoleDefinition = {
  id: RoleId;
  label: string;
  shortLabel: string;
  description: string;
  access: string;
  icon: LucideIcon;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: number;
};

export const roleDefinitions: RoleDefinition[] = [
  {
    id: 'citizen',
    label: 'Affected Citizen',
    shortLabel: 'Citizen',
    description: 'Find safe shelter and check capacity, facilities, and access information.',
    access: 'Shelter information',
    icon: Home,
  },
  {
    id: 'manager',
    label: 'Shelter Manager',
    shortLabel: 'Shelter manager',
    description: 'Manage one assigned site and keep occupancy and resources current.',
    access: 'Assigned shelter',
    icon: MapPinned,
  },
  {
    id: 'response',
    label: 'Emergency Response Team',
    shortLabel: 'Response team',
    description: 'Monitor the network, shelter conditions, and active emergency signals.',
    access: 'Network monitoring',
    icon: ShieldCheck,
  },
  {
    id: 'authority',
    label: 'Disaster Management Authority',
    shortLabel: 'Authority',
    description: 'View the complete network, critical situations, alerts, and analytics.',
    access: 'Full network view',
    icon: BarChart3,
  },
  {
    id: 'admin',
    label: 'System Administrator',
    shortLabel: 'Administrator',
    description: 'Manage platform settings, shelters, and the people using ShelterX.',
    access: 'System controls',
    icon: Settings,
  },
];

export const roleById = Object.fromEntries(
  roleDefinitions.map((role) => [role.id, role]),
) as Record<RoleId, RoleDefinition>;

const dashboardItem = (label = 'Command center'): NavItem => ({
  href: '/dashboard',
  label,
  icon: LayoutDashboard,
});

const profileItem: NavItem = {
  href: '/profile',
  label: 'Profile',
  icon: CircleUserRound,
};

export function getNavigationForRole(role: RoleId) {
  switch (role) {
    case 'citizen':
      return {
        operations: [
          dashboardItem('Home'),
          { href: '/shelters', label: 'Find shelter', icon: MapPinned },
        ],
        workspace: [profileItem],
      };
    case 'manager':
      return {
        operations: [
          dashboardItem('Dashboard'),
          { href: '/shelters/ridgeway', label: 'My shelter', icon: MapPinned },
          { href: '/alerts', label: 'Alerts', icon: BellRing, count: 4 },
        ],
        workspace: [profileItem],
      };
    case 'response':
      return {
        operations: [
          dashboardItem(),
          { href: '/shelters', label: 'Shelter network', icon: MapPinned },
          { href: '/alerts', label: 'Alerts', icon: BellRing, count: 4 },
        ],
        workspace: [profileItem],
      };
    case 'authority':
      return {
        operations: [
          dashboardItem(),
          { href: '/shelters', label: 'Shelter network', icon: MapPinned },
          { href: '/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/alerts', label: 'Alerts', icon: BellRing, count: 4 },
        ],
        workspace: [profileItem],
      };
    case 'admin':
      return {
        operations: [
          dashboardItem(),
          { href: '/shelters', label: 'Shelter network', icon: MapPinned },
          { href: '/users', label: 'Users', icon: UsersRound },
          { href: '/settings', label: 'Settings', icon: Settings },
        ],
        workspace: [profileItem],
      };
  }
}