import {
  createInterview,
  getInterviewById,
  getInterviewsByStaff,
  getAllInterviews,
  updateInterview,
} from "../models/interview.js";
import { getStaffById } from "../models/staff.js";
import { missingBody, missingParams } from "../utils/defaultResponses.js";

export async function create(req, res) {
  const { staffId, maxRound, level } = req.body;
  if (!staffId || !maxRound || !level) {
    return missingBody(res);
  }

  const returnedStaff = await getStaffById(Number(staffId));
  if (!returnedStaff) {
    return res
      .status(400)
      .json({ error: { message: `Staff id ${staffId} does not exist.` } });
  }

  const data = {
    staffId: Number(staffId),
    maxRound: Number(maxRound),
    level,
  };
  const createdInterview = await createInterview(data);
  if (!createInterview) {
    return res
      .status(401)
      .json({ error: { message: "Unable to create interview." } });
  }

  return res.status(201).json({ createdInterview: createdInterview });
}

export async function getAll(req, res) {
  const interviews = await getAllInterviews();
  return res.status(200).json({
    interviews: interviews,
  });
}

export async function getByStaff(req, res) {
  const { staffId } = req.params;
  if (!staffId) {
    return missingParams(res);
  }

  const returnedStaff = await getStaffById(Number(staffId));
  if (!returnedStaff) {
    return res
      .status(400)
      .json({ error: { message: `Staff id ${staffId} does not exist.` } });
  }

  const staffInterviews = await getInterviewsByStaff(Number(staffId));
  if (staffInterviews.hasOwnProperty("error")) {
    return res
      .status(401)
      .json({ error: { message: "Unable to get staff interviews." } });
  }

  return res.status(200).json({ staffInterviews: staffInterviews });
}

export async function getById(req, res) {
  const { interviewId } = req.params;
  if (!interviewId) {
    return missingParams(res);
  }

  const returnedInterview = await getInterviewById(interviewId);
  if (!returnedInterview) {
    return res.status(404).json({
      error: { message: `Interview with ID ${interviewId} does not exist` },
    });
  }

  return res.status(200).json({
    interview: returnedInterview,
  });
}

export async function updateCurrentInterviewRound(req, res) {
  const { interviewId } = req.params;
  const { newCurrentRound } = req.body;
  if (!interviewId) {
    return missingParams(res);
  }
  if (!newCurrentRound) {
    return missingBody(res);
  }

  const returnedInterview = await getInterviewById(interviewId);
  if (!returnedInterview) {
    return res.status(404).json({
      error: { message: `Interview with ID ${interviewId} does not exist` },
    });
  }

  const updatedInterview = await updateInterview(interviewId, newCurrentRound);
  return res.status(201).json({
    updatedInterview: updatedInterview,
  });
}
