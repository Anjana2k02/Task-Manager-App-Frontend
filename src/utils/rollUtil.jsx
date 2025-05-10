// utils/roleUtils.js
export const hasAccess = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};
