export const rolePermissions = {
  admin: ["read_users", "create_users", "update_users", "delete_users"],
  moderator: ["read_users", "update_users"],
  user: ["read_own_user", "update_own_user"],
};

export const allowedRoles = ["admin", "moderator", "user"];
