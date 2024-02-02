import { Payload } from "payload";

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding data...");

  await payload.create({
    collection: "users",
    data: {
      username: "luciano",
      email: process.env.DEFAULT_SUPERUSER_EMAIL,
      password: process.env.DEFAULT_SUPERUSER_PASSWORD,
      role: "OWNER",
    },
  });

  // Add additional seed data here
  payload.logger.info("Done.");
};
