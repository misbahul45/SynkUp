import z from "zod";

export class PostDTO {
    static query() {
        return z.object({
            page: z.string().optional(),
            limit: z.string().optional(),
            q: z.string().optional()
        })
    }

    static params() {
        return z.object({
            id: z.string().uuid(),
        });
    }

    static create() {
        return z.object({
            caption: z.string().min(1),
            imageUrl: z.string().url(),
        });
    }

    static update() {
        return z.object({
            caption: z.string().min(1).optional(),
            imageUrl: z.string().url().optional(),
        });
    }
}

export namespace PostDTOType {
    export type Query = z.infer<ReturnType<typeof PostDTO.query>>;
    export type Params = z.infer<ReturnType<typeof PostDTO.params>>;
    export type Create = z.infer<ReturnType<typeof PostDTO.create>>;
    export type Update = z.infer<ReturnType<typeof PostDTO.update>>;
}