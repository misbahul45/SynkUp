import type { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const successResponse = <T>(
  c: Context,
  data: T,
  message = "Success",
  statusCode: ContentfulStatusCode = 200
) => {
  return c.json(
    {
      status: "success",
      message,
      data,
    },
    statusCode
  );
};

export const errorResponse = (
  c: Context,
  message: string,
  statusCode: ContentfulStatusCode = 500,
  errors?: unknown
) => {
  return c.json(
    {
      status: "error",
      message,
      ...(errors ? { errors } : {}),
    },
    statusCode
  );
};
