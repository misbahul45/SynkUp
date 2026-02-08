import db from "../../../databases/init";
import { profile } from "../../../databases/repository/profile";
import { AppError } from "../../../lib/error";
import { ProfileDTOType } from "./profile.dto";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export const getProfileByIdService = async (
  params: ProfileDTOType.Params
) => {
  const result = await db
    .select()
    .from(profile)
    .where(eq(profile.id, params.id))
    .limit(1);

  const foundProfile = result[0];

  if (!foundProfile) {
    throw new AppError("Profile not found", 404);
  }

  return foundProfile;
};

export const createProfileService = async (
  userId: string,
  profileData: ProfileDTOType.Create
) => {
  const existingProfile = await db
    .select()
    .from(profile)
    .where(eq(profile.userId, userId))
    .limit(1);

  if (existingProfile.length > 0) {
    throw new AppError("Profile already exists", 400);
  }

  const profileId = randomUUID();

  await db.insert(profile).values({
    id: profileId,
    userId,
    bio: profileData.bio ?? null,
    image: profileData.image ?? null,
  });

  const createdProfile = await db
    .select()
    .from(profile)
    .where(eq(profile.id, profileId))
    .limit(1);

  return createdProfile[0];
};

export const updateProfileService = async (
  params: ProfileDTOType.Params,
  profileData: ProfileDTOType.Update
) => {
  const existingProfile = await db
    .select()
    .from(profile)
    .where(eq(profile.id, params.id))
    .limit(1);

  if (!existingProfile[0]) {
    throw new AppError("Profile not found", 404);
  }

  await db
    .update(profile)
    .set({
      ...(profileData.bio !== undefined && { bio: profileData.bio }),
      ...(profileData.image !== undefined && { image: profileData.image }),
    })
    .where(eq(profile.id, params.id));

  const updatedProfile = await db
    .select()
    .from(profile)
    .where(eq(profile.id, params.id))
    .limit(1);

  return updatedProfile[0];
};

export const deleteProfileService = async (
  params: ProfileDTOType.Params
) => {
  const existingProfile = await db
    .select()
    .from(profile)
    .where(eq(profile.id, params.id))
    .limit(1);

  if (!existingProfile[0]) {
    throw new AppError("Profile not found", 404);
  }

  await db.delete(profile).where(eq(profile.id, params.id));

  return existingProfile[0];
};
