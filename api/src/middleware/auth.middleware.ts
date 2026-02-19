import type { Context, Next } from "hono";
import { errorResponse } from "../lib/respon";

export const loginMiddleware = async (c: Context, next: Next) => {
  const user = c.get("user");

  if (!user) {
    return errorResponse(c,"Unauthorized", 401);
  }

  await next();
};