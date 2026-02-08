import { desc, eq, like } from "drizzle-orm";
import db from "../../../../databases/init";
import { post } from "../../../../databases/repository/posts.";
import { AppError } from "../../../../lib/error";
import { PostDTOType } from "./index.dto"

export const getPostsService = async (query: PostDTOType.Query) => {
    const { page, limit, q } = query;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const offset = (pageNum - 1) * limitNum;

    return await db
        .select()
        .from(post)
        .where(q ? like(post.caption, `%${q}%`) : undefined)
        .limit(limitNum)
        .offset(offset);
};


export const getPostByIdService = async (id: PostDTOType.Params["id"]) => {
    const result = await db
        .select()
        .from(post)
        .where(eq(post.id, id));

    if (!result[0]) {
        throw new AppError("Post not found", 404);
    }

    return result[0];
};

export const createPostService = async (
  postData: PostDTOType.Create,
  userId: string
) => {

  await db.insert(post).values({
    caption: postData.caption,
    imageUrl: postData.imageUrl,
    authorId: userId,
  });

  const [createdPost] = await db
    .select()
    .from(post)
    .where(eq(post.authorId, userId))
    .orderBy(desc(post.createdAt))
    .limit(1);

  return createdPost;
};

export const updatePostService = async (
  postUpdate: PostDTOType.Update,
  id: PostDTOType.Params["id"]
) => {
  const existingPost = await db
    .select()
    .from(post)
    .where(eq(post.id, id));

  if (!existingPost[0]) {
    throw new AppError("Post not found", 404);
  }

  await db
    .update(post)
    .set({
      caption: postUpdate.caption ?? existingPost[0].caption,
      imageUrl: postUpdate.imageUrl ?? existingPost[0].imageUrl,
    })
    .where(eq(post.id, id));


  const updated = await db
    .select()
    .from(post)
    .where(eq(post.id, id));

  return updated[0];
};


export const deletePostService = async (id: PostDTOType.Params["id"]) => {
    const existingPost = await db
        .select()
        .from(post)
        .where(eq(post.id, id));

    if (!existingPost[0]) {
        throw new AppError("Post not found", 404);
    }

    return await db.delete(post).where(eq(post.id, id));
};
