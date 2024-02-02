import { CollectionConfig } from "payload/types";

const Sectors: CollectionConfig = {
  slug: "sectors",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "parentSector",
      type: "relationship",
      relationTo: ["sectors"],
      hasMany: false,
    },
    {
      name: "childSectors",
      type: "relationship",
      relationTo: ["sectors"],
      hasMany: true,
    },
  ],
};

export default Sectors;
