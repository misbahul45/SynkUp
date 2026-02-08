import db from "../../../../databases/init";
import { postComment } from "../../../../databases/repository/postComment";
import { and, eq, like } from "drizzle-orm";
import { AppError } from "../../../../lib/error";
import { PostCommentDTOType } from "./comments.dto";


export const getPostCommentsService = async (query: PostCommentDTOType.Query) => {
  const { postId, userId, q, page, limit } = query;
  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;
  const offset = (pageNum - 1) * limitNum;

  let condition: any = undefined;

  if (postId && userId) {
    condition = and(eq(postComment.postId, postId), eq(postComment.userId, userId));
  } else if (postId) {
    condition = eq(postComment.postId, postId);
  } else if (userId) {
    condition = eq(postComment.userId, userId);
  }

  if (q) {
    condition = condition ? and(condition, like(postComment.content, `%${q}%`)) : like(postComment.content, `%${q}%`);
  }

  return await db
    .select()
    .from(postComment)
    .where(condition)
    .limit(limitNum)
    .offset(offset);
};

export const getPostCommentService = async (id: string) => {
  const result = await db.select().from(postComment).where(eq(postComment.id, id));
  if (!result[0]) throw new AppError("Comment not found", 404);
  return result[0];
};

export const createPostCommentService = async (
  commentData: PostCommentDTOType.Create,
  userId: string
) => {
  return await db.insert(postComment).values({
    postId: commentData.postId,
    content: commentData.content,
    userId: userId,
  });
};

export const updatePostCommentService = async (
  commentUpdate: PostCommentDTOType.Update,
  id: string
) => {
  const existing = await db.select().from(postComment).where(eq(postComment.id, id));
  if (!existing[0]) throw new AppError("Comment not found", 404);

  return await db
    .update(postComment)
    .set({
      content: commentUpdate.content ?? existing[0].content,
    })
    .where(eq(postComment.id, id));
};

export const deletePostCommentService = async (id: string) => {
  const existing = await db.select().from(postComment).where(eq(postComment.id, id));
  if (!existing[0]) throw new AppError("Comment not found", 404);

  return await db.delete(postComment).where(eq(postComment.id, id));
};
