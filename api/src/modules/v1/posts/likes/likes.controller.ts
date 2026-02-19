import { Context } from "hono"
import { tryCatch } from "../../../../lib/error"
import { createLikeService, deleteLikeService } from "./likes.service"
import { successResponse } from "../../../../lib/respon"


export const createLikeController = async (c: Context) => {
  const query = c.get("validatedQuery");
  const user = c.get("user");

  const like = await tryCatch(async () =>
    createLikeService(query.postId, user.id)
  );

  return successResponse(c, like, "Like created successfully", 201);
};

export const deleteLikeController = async (c: Context) => {
  const query = c.get("validatedQuery");
  const user = c.get("user");

  const like = await tryCatch(async () =>
    deleteLikeService(query.postId, user.id)
  );

  return successResponse(c, like, "Unliked successfully", 200);
};
