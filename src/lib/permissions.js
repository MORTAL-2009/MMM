/**
 * Role-Based Access Control (RBAC) definitions for Make My Marriage
 * Roles: owner, admin, member, guest
 */

export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
};

export const PERMISSIONS = {
  // Wedding Workspace Permissions
  MANAGE_WORKSPACE: [ROLES.OWNER],
  DELETE_WORKSPACE: [ROLES.OWNER],
  EDIT_WEDDING_DETAILS: [ROLES.OWNER, ROLES.ADMIN],
  
  // Member Management
  INVITE_MEMBERS: [ROLES.OWNER, ROLES.ADMIN],
  REMOVE_MEMBERS: [ROLES.OWNER, ROLES.ADMIN],
  CHANGE_ROLES: [ROLES.OWNER],
  
  // Expenses
  VIEW_EXPENSES: [ROLES.OWNER, ROLES.ADMIN, ROLES.MEMBER],
  ADD_EXPENSES: [ROLES.OWNER, ROLES.ADMIN, ROLES.MEMBER],
  EDIT_ANY_EXPENSE: [ROLES.OWNER, ROLES.ADMIN],
  DELETE_EXPENSE: [ROLES.OWNER, ROLES.ADMIN],
  
  // Invitations
  EDIT_INVITATION: [ROLES.OWNER, ROLES.ADMIN],
  PUBLISH_INVITATION: [ROLES.OWNER],
  
  // Chat
  SEND_MESSAGES: [ROLES.OWNER, ROLES.ADMIN, ROLES.MEMBER],
  MODERATE_MESSAGES: [ROLES.OWNER, ROLES.ADMIN],
  
  // Admin Panel
  ACCESS_ADMIN_PANEL: [ROLES.OWNER, ROLES.ADMIN],
};

export function hasPermission(userRole, permissionArray) {
  if (!userRole) return false;
  return permissionArray.includes(userRole);
}

export function isOwner(role) {
  return role === ROLES.OWNER;
}

export function isAdminOrOwner(role) {
  return role === ROLES.OWNER || role === ROLES.ADMIN;
}
