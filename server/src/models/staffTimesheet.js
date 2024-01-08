import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTimeRecord(clockInData) {
  return await prisma.staffTimesheet
    .create({
      data: {
        imageUrl: clockInData.imageUrl,
        timeIn: clockInData.time,
        staff: {
          connect: {
            id: clockInData.staffId,
          },
        },
      },
      include: {
        staff: false,
      },
    })
    .then((createdRecord) => createdRecord);
}

export async function updateTimeRecord(clockOutData) {
  return await prisma.staffTimesheet.update({
    where: {
      id: clockOutData.staffTimesheetId,
    },
    data: {
      timeOut: clockOutData.time,
    },
  });
}

export async function updateLastTimeRecord(lastRecordId, clockOutCurrentTime) {
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
