import z from "zod";

export class LikeDTO{
    static query(){
        return z.object({
            postId:z.string().uuid()
        })
    }
}


export namespace LikeDTOType{
    export type Query = z.infer<ReturnType<typeof LikeDTO.query>>
}