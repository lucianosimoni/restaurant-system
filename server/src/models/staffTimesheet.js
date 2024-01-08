import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTimeRecord(timesheetRecordData) {
  return await prisma.staffTimesheet
    .create({
      data: {
        imageUrl: timesheetRecordData.imageUrl,
        timeIn: timesheetRecordData.timeIn,
        staff: {
          connect: {
            id: timesheetRecordData.staffId,
          },
        },
      },
      include: {
        staff: false,
      },
    })
    .then((createdRecord) => createdRecord);
}
