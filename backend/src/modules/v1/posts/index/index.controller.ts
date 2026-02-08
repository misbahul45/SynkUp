import { Context } from "hono";
import { tryCatch } from "../../../../lib/error";
import { createPostService, deletePostService, getPostByIdService, getPostsService, updatePostService } from "./index.service";
import { successResponse } from "../../../../lib/respon";

export const getPostsController = async (c:Context) => {
    const query = c.get("validatedQuery");

    const posts=await tryCatch(async()=>
        await getPostsService(query)
    )
    return successResponse(c, posts, "Posts fetched successfully", 200);
}
export const getPostByIdController = async (c:Context) => {
    const params = c.get("validatedParams");
    
    const post=await tryCatch(async()=>
        await getPostByIdService(params.id)
    )
    return successResponse(c, post, "Post fetched successfully", 200);
}
export const createPostController = async (c:Context) => {
    const body = c.get("validatedBody");
    const user = c.get("user");

    const post=await tryCatch(async()=>
        await createPostService(body, user.id)
    )
    return successResponse(c, post, "Post created successfully", 201);
}
export const updatePostController = async (c:Context) => {
    const params = c.get("validatedParams");
    const body = c.get("validatedBody");
    
    const post=await tryCatch(async()=>
        await updatePostService(body, params.id)
    )
    return successResponse(c, post, "Post updated successfully", 200);
}
export const deletePostController = async (c:Context) => {
    const params = c.get("validatedParams");
    const post=await tryCatch(async()=>
        await deletePostService(params.id)
    )
    return successResponse(c, post, "Post deleted successfully", 200);
}