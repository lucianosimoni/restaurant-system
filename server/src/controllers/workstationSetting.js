import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";
import {
  //   createWorkstationSetting,
  getAllWorkstationSettings,
  //   getWorkstationSettingById,
  //   getWorkstationSettingByTitle,
} from "../models/workstationSetting.js";

// export async function register(req, res) {
//   const { staffId, imageUrl, clockInTime } = req.body;

//   if (!staffId || !imageUrl || !clockInTime) {
//     return missingBody(res);
//   }

//   // Verify if in UTC format
//   const dateObject = new Date(clockInTime);
//   if (isNaN(dateObject) || dateObject.getTimezoneOffset() !== 0) {
//     return wrongBody(res);
//   }

//   const clockedInRecord = await createTimeRecord({
//     staffId,
//     imageUrl,
//     time: clockInTime,
//   });
//   if (!clockedInRecord) {
//     return internalError(res, "Error while creating timesheet record.");
//   }

//   return res.status(201).json({ clockedInRecord: { ...clockedInRecord } });
// }

export async function getAll(req, res) {
  try {
    const workstationSettings = await getAllWorkstationSettings();
    return res.status(200).json({ workstationSettings: workstationSettings });
  } catch (error) {
    console.error("Error fetching all workstationSettings: ", error);
    return internalError(res, "Error while getting all workstationSettings.");
  }
}

// export async function getById(req, res) {
//   const workstationId = req.params.workstationId;

//   if (!parseInt(workstationId)) {
//     return res.status(400).json({ error: "Missing workstation ID." });
//   }

//   try {
//     const includeInfo = req.query.includeInfo === "true";
//     const workstation = await getWorkstationById(
//       parseInt(workstationId),
//       includeInfo
//     );
//     if (!workstation) {
//       return notFound(res);
//     }
//     return res.status(200).json({ workstation: workstation });
//   } catch (error) {
//     console.error("Error fetching workstation by Id: ", error);
//     return internalError("Error while getting workstation by id.");
//   }
// }
