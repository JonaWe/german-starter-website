import { ACCESS_ROLES, RoleId } from '../../data/AccessRoles';

const isAllowedRole = (userRoleId: RoleId, requiredRoleId: RoleId) => {
  const requiredRole = ACCESS_ROLES[requiredRoleId];
  const userRole = ACCESS_ROLES[userRoleId as RoleId] || ACCESS_ROLES.user;

  if (!userRole) return false;
  return userRole?.accessLevel >= requiredRole.accessLevel;
};

export default isAllowedRole;
