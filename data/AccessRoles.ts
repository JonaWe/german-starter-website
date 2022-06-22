export type RoleId = 'dev' | 'admin' | 'user' | 'owner';

const isOfTypeRole = (roleId: string): roleId is RoleId => {
  return ['dev', 'admin', 'owner', 'user'].includes(roleId);
};

const ACCESS_ROLES = {
  dev: {
    id: 'dev',
    name: 'Developer',
    accessLevel: 3,
    accessLevelDescription: 'full access and developer features',
    description: 'Developer of the server',
  },
  owner: {
    id: 'owner',
    name: 'Owner',
    accessLevel: 2,
    accessLevelDescription: 'full access',
    description: 'Server owner',
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    accessLevel: 1,
    accessLevelDescription: 'access to tickets and news',
    description: 'Server administrator',
  },
  user: {
    id: 'user',
    name: 'User',
    accessLevel: 0,
    accessLevelDescription: 'no additional access',
    description: 'Signed in user',
  },
};

export { ACCESS_ROLES, isOfTypeRole };
