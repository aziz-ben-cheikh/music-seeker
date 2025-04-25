"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rolePermissions = exports.allowedRoles = void 0;
var rolePermissions = exports.rolePermissions = {
  admin: ["read_users", "create_users", "update_users", "delete_users"],
  moderator: ["read_users", "update_users"],
  user: ["read_own_user", "update_own_user"]
};
var allowedRoles = exports.allowedRoles = ["admin", "moderator", "user"];