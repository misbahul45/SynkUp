import db from "../../../databases/init";
import { user, account } from "../../../databases/repository/auth";
import { AppError } from "../../../lib/error";
import { UserDTOType } from "./users.dto";
import { eq, like } from "drizzle-orm";
import { randomUUID } from "crypto";


export const getUserByIdService = async (
  params: UserDTOType.Params
) => {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.id, params.id))
    .limit(1);

  const foundUser = result[0];

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  return foundUser;
};


export const getAllUsersService = async (
  query: UserDTOType.QuerySearch
) => {
  const { q } = query;

  if (q) {
    return await db
      .select()
      .from(user)
      .where(like(user.name, `%${q}%`));
  }

  return await db.select().from(user);
};


export const createUserService = async (
  userData: UserDTOType.Create
) => {
  const userId = randomUUID();
  const accountId = randomUUID();

  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, userData.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new AppError("Email already registered", 400);
  }

  const hashedPassword = await Bun.password.hash(userData.password,{
    algorithm:'argon2id'
  });


  await db.transaction(async (tx) => {
    await tx.insert(user).values({
      id: userId,
      name: userData.username,
      email: userData.email,
      emailVerified: false,
      bio: userData.bio,
      image: userData.image,
    });


    await tx.insert(account).values({
      id: accountId,
      accountId: userData.email,
      providerId: "credentials",
      userId: userId,
      password: hashedPassword,
    });
  });

  const createdUser = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return createdUser[0];
};

export const updateUserService = async (
  params: UserDTOType.Params,
  userData: UserDTOType.Update
) => {
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.id, params.id))
    .limit(1);

  if (!existingUser[0]) {
    throw new AppError("User not found", 404);
  }

  await db
    .update(user)
    .set({
      ...(userData.username && { name: userData.username }),
      ...(userData.email && { email: userData.email }),
      ...(userData.bio && { bio: userData.bio }),
      ...(userData.image && { image: userData.image }),
    })
    .where(eq(user.id, params.id));

  const updatedUser = await db
    .select()
    .from(user)
    .where(eq(user.id, params.id))
    .limit(1);

  return updatedUser[0];
};


export const deleteUserService = async (
  params: UserDTOType.Params
) => {
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.id, params.id))
    .limit(1);

  if (!existingUser[0]) {
    throw new AppError("User not found", 404);
  }

  await db
    .delete(user)
    .where(eq(user.id, params.id));

  return existingUser[0];
};
