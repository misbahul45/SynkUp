import db from "../../../../databases/init";
import { postComment } from "../../../../databases/repository/postComment";
import { and, eq, like } from "drizzle-orm";
import { AppError } from "../../../../lib/error";
import { PostCommentDTOType } from "./comments.dto";
import { post } from "../../../../databases/repository/posts";


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

  const existingPost = await db
    .select()
    .from(post)
    .where(eq(post.id, commentData.postId));

  if (!existingPost[0]) {
    throw new AppError("Post not found", 404);
  }

  await db.insert(postComment).values({
    postId: commentData.postId,
    content: commentData.content,
    userId: userId,
  });

  const [inserted] = await db
    .select()
    .from(postComment)
    .where(
      and(
        eq(postComment.postId, commentData.postId),
        eq(postComment.userId, userId)
      )
    )
    .orderBy(postComment.createdAt)
    .limit(1);

  return inserted;
};


export const updatePostCommentService = async (
  commentUpdate: PostCommentDTOType.Update,
  id: string
) => {
  const existing = await db.select().from(postComment).where(eq(postComment.id, id));
  if (!existing[0]) throw new AppError("Comment not found", 404);

  await db
    .update(postComment)
    .set({
      content: commentUpdate.content ?? existing[0].content,
    })
    .where(eq(postComment.id, id));


  const [updated] = await db
    .select()
    .from(postComment)
    .where(eq(postComment.id, id));

  return updated;
};

export const deletePostCommentService = async (id: string) => {
  const existing = await db.select().from(postComment).where(eq(postComment.id, id));
  if (!existing[0]) throw new AppError("Comment not found", 404);

  await db.delete(postComment).where(eq(postComment.id, id));

  return existing[0];  
};

