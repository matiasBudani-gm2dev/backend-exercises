import Users from "./UserModel.js";
import UserRole from "./UserRoleModel.js";
import Roles from "./RoleModel.js";

Users.hasMany(UserRole, {
    foreignKey: "userId"
})

UserRole.belongsTo(Users, {
    foreignKey: "userId"
})

Roles.hasMany(UserRole, {
    foreignKey: "roleId"
})

UserRole.belongsTo(Roles, {
    foreignKey: "roleId"
})

export {UserRole, Users, Roles}