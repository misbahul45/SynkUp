import { and, eq } from "drizzle-orm"
import db from "../../../../databases/init"
import { postLike } from "../../../../databases/repository/postLike"
import { AppError } from "../../../../lib/error"

export const createLikeService = async (postId: string, userId: string) => {
  const existingLike = await db
    .select()
    .from(postLike)
    .where(and(
        eq(postLike.postId, postId),
        eq(postLike.userId, userId)
    ));

  if (existingLike.length > 0) {
    throw new AppError("User already liked this post", 400);
  }

  return await db.insert(postLike).values({
    postId,
    userId,
  });
};

export const deleteLikeService=async(postId:string, userId:string)=>{
   const existingLike = await db
    .select()
    .from(postLike)
    .where(and(
        eq(postLike.postId, postId),
        eq(postLike.userId, userId)
    ));
    if (existingLike.length === 0) {
        throw new AppError("User has not liked this post yet", 404);
    }

   return await db
    .delete(postLike)
    .where(and(
        eq(postLike.postId, postId),
        eq(postLike.userId, userId)
    ));

}