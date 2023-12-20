import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createInterview({ staffId, maxRound, level }) {
  return await prisma.interview.create({
    data: {
      maxRound: maxRound,
      level: level,
      staff: {
        connect: {
          id: staffId,
        },
      },
      interviewStats: {
        create: {},
      },
    },
    include: {
      interviewStats: true,
    },
  });
}

export async function getInterviewById(interviewId) {
  return await prisma.interview.findUnique({
    where: {
      id: Number(interviewId),
    },
  });
}

export async function getAllInterviews() {
  return await prisma.interview.findMany();
}

export async function getInterviewsByStaff(staffId) {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        staff: {
          id: staffId,
        },
      },
      include: {
        interviewStats: true,
      },
    });
    return interviews;
  } catch (error) {
    console.log(
      "🔴 Error ocurred in the Backend while getting Interviews by Staff id"
    );
    return error;
  }
  return await prisma.interview.findMany({
    where: {
      staff: {
        id: staffId,
      },
    },
    include: {
      interviewStats: true,
    },
  });
}

export async function updateInterview(interviewId, newCurrentRound) {
  return await prisma.interview.update({
    where: {
      id: Number(interviewId),
    },
    data: {
      currentRound: newCurrentRound,
    },
  });
}
