import z from "zod";

export class PostCommentDTO {
  static create() {
    return z.object({
      content: z.string().min(1),
      postId: z.string().uuid(), 
    });
  }

  static update() {
    return z.object({
      content: z.string().min(1).optional(),
    });
  }

  static params() {
    return z.object({
      id: z.string().uuid(), 
    });
  }

  static query() {
    return z.object({
      postId: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      page: z.string().optional(),
      limit: z.string().optional(),
      q: z.string().optional(),
    });
  }
}

export namespace PostCommentDTOType {
  export type Create = z.infer<ReturnType<typeof PostCommentDTO.create>>;
  export type Update = z.infer<ReturnType<typeof PostCommentDTO.update>>;
  export type Params = z.infer<ReturnType<typeof PostCommentDTO.params>>;
  export type Query = z.infer<ReturnType<typeof PostCommentDTO.query>>;
}
