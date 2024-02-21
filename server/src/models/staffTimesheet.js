import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TODO: Transform whole file into one object export as in the controllers/

export async function createTimeRecord(clockInData) {
  return await prisma.staffTimesheet
    .create({
      data: {
        imageInUrl: clockInData.imageUrl,
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
      imageOutUrl: clockOutData.imageUrl,
      timeOut: clockOutData.time,
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
