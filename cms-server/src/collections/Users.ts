import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: false,
    removeTokenFromResponses: true,
  },
  admin: {
    useAsTitle: "username", // Use username as the title in the admin panel
  },
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      options: ["STAFF", "SECTOR_LEADER", "MANAGER", "OWNER"],
      defaultValue: "STAFF",
    },
    {
      name: "sector",
      type: "relationship",
      relationTo: ["sectors"],
      hasMany: false,
    },
    {
      name: "info",
      type: "group",
      fields: [
        {
          name: "firstName",
          type: "text",
        },
        {
          name: "lastName",
          type: "text",
        },
      ],
    },
  ],
};

export default Users;
