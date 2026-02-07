import { Context } from "hono"
import { tryCatch } from "../../../lib/error";
import { createUserService, getAllUsersService, getUserByIdService, updateUserService } from "./users.service";
import { successResponse } from "../../../lib/respon";

export const getAllUserController = async (c:Context) => {
    const query=c.get("validatedQuery");

    const users = await tryCatch(async () =>
        await getAllUsersService(query)
    );

  return successResponse(c, users);
}

export const geUserController = async (c:Context) => {
    const params=c.get("validateParams");

    const user = await tryCatch(async () =>
        await getUserByIdService(params)
    );

  return successResponse(c, user);
}


export const createUserController = async (c:Context) => {
    const body=c.get("validatedBody");

    const user = await tryCatch(async () =>
        await createUserService(body)
    );

  return successResponse(c, user, "User created successfully", 201);
}

export const updateUserController = async(c:Context) => {
    const params=c.get("validatedParams");
    const body=c.get("validatedBody");

    const user = await tryCatch(async () =>
        await updateUserService(params, body)
    );
    return successResponse(c, user, "User updated successfully");

}

export const deleteUserController = (c:Context) => {
    const params=c.get("validatedParams");

    return successResponse(c, null, `User with ID: ${params.id} deleted successfully`);
}