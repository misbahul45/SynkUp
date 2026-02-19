import type { Context, Next } from "hono";
import { z, ZodTypeAny } from "zod";
import { errorResponse } from "../lib/respon";


export const validateBody = (schema: ZodTypeAny) => {
  return async (c: Context, next: Next) => {
    const body = await c.req.json().catch(() => ({}));

    const result = schema.safeParse(body);

    if (!result.success) {
      return errorResponse(c, "Validation error", 422, result.error.flatten().fieldErrors);
    }


    c.set("validatedBody", result.data);

    await next();
  };
};

export const validateParams = (schema: ZodTypeAny) => {
  return async (c: Context, next: Next) => {
    const result = schema.safeParse(c.req.param());

    if (!result.success) {
      return errorResponse(c, "Validation error", 422, result.error.flatten().fieldErrors);
    }

    c.set("validatedParams", result.data);

    await next();
  };
};

export const validateQuery = (schema: ZodTypeAny) => {
  return async (c: Context, next: Next) => {
    const result = schema.safeParse(c.req.query());

    if (!result.success) {
      return errorResponse(c, "Validation error", 422, result.error.flatten().fieldErrors);
    }

    c.set("validatedQuery", result.data);

    await next();
  };
};
