import { Context } from "hono";
import { tryCatch } from "../../../lib/error";
import { successResponse } from "../../../lib/respon";
import {
  createProfileService,
  deleteProfileService,
  getProfileByIdService,
  updateProfileService,
} from "./profile.service";

export const getProfileController = async (c: Context) => {
  const params = c.get("validatedParams");

  const profile = await tryCatch(async () =>
    await getProfileByIdService(params)
  );

  return successResponse(c, profile);
};

export const createProfileController = async (c: Context) => {
  const body = c.get("validatedBody");
  const user = c.get("user"); // dari loginMiddleware

  const profile = await tryCatch(async () =>
    await createProfileService(user.id, body)
  );

  return successResponse(c, profile, "Profile created", 201);
};

export const updateProfileController = async (c: Context) => {
  const params = c.get("validatedParams");
  const body = c.get("validatedBody");

  const profile = await tryCatch(async () =>
    await updateProfileService(params, body)
  );

  return successResponse(c, profile, "Profile updated");
};

export const deleteProfileController = async (c: Context) => {
  const params = c.get("validatedParams");

  const profile = await tryCatch(async () =>
    await deleteProfileService(params)
  );

  return successResponse(c, profile, "Profile deleted");
};
