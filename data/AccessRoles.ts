export type RoleId = 'dev' | 'admin' | 'user' | 'owner';

const isOfTypeRole = (roleId: string): roleId is RoleId => {
  return ['dev', 'admin', 'owner', 'user'].includes(roleId);
};

const ACCESS_ROLES = {
  dev: {
    id: 'dev',
    name: 'Developer',
    accessLevel: 3,
    description: 'Developer of the server',
  },
  owner: {
    id: 'owner',
    name: 'Owner',
    accessLevel: 2,
    description: 'Server administrator',
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    accessLevel: 1,
    description: 'Server administrator',
  },
  user: {
    id: 'user',
    name: 'User',
    accessLevel: 0,
    description: 'Signed in user',
  },
};

export { ACCESS_ROLES, isOfTypeRole };
