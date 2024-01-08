import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTimeRecord(timesheetRecordData) {
  return await prisma.staffTimesheet
    .create({
      data: {
        imageUrl: timesheetRecordData.imageUrl,
        timeIn: timesheetRecordData.currentTime,
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

export async function updateTimeRecord(lastRecordId, clockOutCurrentTime) {
  return await prisma.staffTimesheet.update({
    where: {
      id: lastRecordId,
    },
    data: {
      timeOut: clockOutCurrentTime,
    },
  });
}

export async function getLastRecord(staffId) {
  return await prisma.staffTimesheet.findFirst({
    where: {
      staffId: staffId,
    },
    orderBy: {
      timeIn: "desc",
    },
  });
}
