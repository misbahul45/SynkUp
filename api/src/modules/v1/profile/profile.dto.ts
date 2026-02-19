import z from "zod";

export class ProfileDTO {
  static create() {
    return z.object({
      bio: z.string().max(500).optional(),
      image: z.string().url().optional(),
    });
  }

  static update() {
    return z.object({
      bio: z.string().max(500).optional(),
      image: z.string().url().optional(),
    });
  }

  static params() {
    return z.object({
      id: z.string().uuid(),
    });
  }
}

export namespace ProfileDTOType {
  export type Create = z.infer<ReturnType<typeof ProfileDTO.create>>;
  export type Update = z.infer<ReturnType<typeof ProfileDTO.update>>;
  export type Params = z.infer<ReturnType<typeof ProfileDTO.params>>;
}
