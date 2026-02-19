import { Context } from "hono";
import { tryCatch } from "../../../../lib/error";
import {
  createPostCommentService,
  deletePostCommentService,
  getPostCommentService,
  getPostCommentsService,
  updatePostCommentService,
} from "./comments.service";
import { successResponse } from "../../../../lib/respon";
import { PostCommentDTOType } from "./comments.dto";

export const getPostCommentsController = async (c: Context) => {
  const query = c.get("validatedQuery") as PostCommentDTOType.Query;
  const comments = await tryCatch(() => getPostCommentsService(query));
  return successResponse(c, comments, "Comments fetched successfully", 200);
};

export const getPostCommentController = async (c: Context) => {
  const params = c.get("validatedParams") as { id: string };
  const comment = await tryCatch(() => getPostCommentService(params.id));
  return successResponse(c, comment, "Comment fetched successfully", 200);
};

export const createPostCommentController = async (c: Context) => {
  const body = c.get("validatedBody") as PostCommentDTOType.Create;
  const user = c.get("user");
  const comment = await tryCatch(() => createPostCommentService(body, user.id));
  return successResponse(c, comment, "Comment created successfully", 201);
};

export const updatePostCommentController = async (c: Context) => {
  const params = c.get("validatedParams") as { id: string };
  const body = c.get("validatedBody") as PostCommentDTOType.Update;
  const comment = await tryCatch(() => updatePostCommentService(body, params.id));
  return successResponse(c, comment, "Comment updated successfully", 200);
};

export const deletePostCommentController = async (c: Context) => {
  const params = c.get("validatedParams") as { id: string };
  const comment = await tryCatch(() => deletePostCommentService(params.id));
  return successResponse(c, comment, "Comment deleted successfully", 200);
};
