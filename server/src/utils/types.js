export const RoleTypes = {
  EMPLOYEE: "EMPLOYEE",
  SECTOR_LEADER: "SECTOR_LEADER",
  MANAGER: "MANAGER",
  OWNER: "OWNER",
};

export const GroupedRoles = {
  ALL_EMPLOYEES: [
    RoleTypes.EMPLOYEE,
    RoleTypes.SECTOR_LEADER,
    RoleTypes.MANAGER,
    RoleTypes.OWNER,
  ],
  ALL_BUT_EMPLOYEE: [
    RoleTypes.SECTOR_LEADER,
    RoleTypes.MANAGER,
    RoleTypes.OWNER,
  ],
  MANAGER_OWNER: [RoleTypes.MANAGER, RoleTypes.OWNER],
};
