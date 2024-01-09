import {
  internalError,
  notFound,
  missingBody,
} from "../utils/defaultResponses.js";
import {
  //   createWorkstationSetting,
  getAllWorkstationSettings,
  getWorkstationSettingById,
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

export async function getById(req, res) {
  const workstationSettingId = req.params.workstationSettingId;

  if (!parseInt(workstationSettingId)) {
    return res.status(400).json({ error: "Missing workstation setting ID." });
  }

  try {
    const workstationSetting = await getWorkstationSettingById(
      parseInt(workstationSettingId)
    );
    if (!workstationSetting) {
      return notFound(res);
    }
    return res.status(200).json({ workstationSetting: workstationSetting });
  } catch (error) {
    console.error("Error fetching workstation setting by Id: ", error);
    return internalError("Error while getting workstation setting by id.");
  }
}
