import z from "zod";

export class UserDTO {
    static create() {
        return z.object({
            username: z.string().min(3).max(30),
            email: z.string().email(),
            password: z.string().min(6),
            image: z.string().url().optional(),
            bio: z.string().max(160).optional(),
        });
    }

    static update() {
        return z.object({
            username: z.string().min(3).max(30).optional(),
            email: z.string().email().optional(),
            password: z.string().min(6).optional(),
            image: z.string().url().optional(),
            bio: z.string().max(160).optional(),
        });
    }

    static params() {
        return z.object({
            id: z.string().uuid(),
        });
    }

    static querySearch() {
        return z.object({
            q: z.string().min(1).max(100).optional(),
            page: z.coerce.number().min(1).default(1).optional(),
            limit: z.coerce.number().min(1).max(100).default(10).optional(),
        });
    }
}

/**
 * Proper Type Inference
 */
export namespace UserDTOType {
    export type Create = z.infer<ReturnType<typeof UserDTO.create>>;
    export type Update = z.infer<ReturnType<typeof UserDTO.update>>;
    export type Params = z.infer<ReturnType<typeof UserDTO.params>>;
    export type QuerySearch = z.infer<ReturnType<typeof UserDTO.querySearch>>;
}
