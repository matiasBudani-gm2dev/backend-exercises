import Users from "./UserModel.js";
import UserRole from "./UserRoleModel.js";
import Roles from "./RoleModel.js";
import VerificationCodes from "./VerificationCodes.js";

Users.hasMany(UserRole, {
  foreignKey: "userId",
});

UserRole.belongsTo(Users, {
  foreignKey: "userId",
});

Roles.hasMany(UserRole, {
  foreignKey: "roleId",
});

UserRole.belongsTo(Roles, {
  foreignKey: "roleId",
});

Users.hasMany(VerificationCodes, { foreignKey: "user_id" });
VerificationCodes.belongsTo(Users, { foreignKey: "user_id" });

export { UserRole, Users, Roles, VerificationCodes };
