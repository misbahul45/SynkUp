import { Context } from "hono"
import { tryCatch } from "../../../../lib/error"
import { createLikeService, deleteLikeService } from "./likes.service"
import { successResponse } from "../../../../lib/respon"

export const createLikeController=async(c:Context)=>{
    const query= c.get('validateQuery')
    const user=c.get('user')

    const like = tryCatch(async()=>
        await createLikeService(query.postId, user.id)
    )
    return successResponse(c, like, "Like created successfully", 201);
}
export const deleteLikeController=async(c:Context)=>{
    const query= c.get('validateQuery')
    const user=c.get('user')

    const like=await tryCatch(async ()=>
        await deleteLikeService(query.postId, user.id)
    )

   return successResponse(c, like, "Unliked successfully", 200);
}