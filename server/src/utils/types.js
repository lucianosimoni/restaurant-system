export const RoleTypes = {
  STAFF: "STAFF",
  SECTOR_LEADER: "SECTOR_LEADER",
  MANAGER: "MANAGER",
  OWNER: "OWNER",
};

export const GroupedRoles = {
  ALL_EMPLOYEES: [
    RoleTypes.STAFF,
    RoleTypes.SECTOR_LEADER,
    RoleTypes.MANAGER,
    RoleTypes.OWNER,
  ],
  ALL_BUT_STAFF: [RoleTypes.SECTOR_LEADER, RoleTypes.MANAGER, RoleTypes.OWNER],
  MANAGER_OWNER: [RoleTypes.MANAGER, RoleTypes.OWNER],
};
