import { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode : ContentfulStatusCode = 500
  ) {
    super(message);
  }
}


export const tryCatch = async <T>(
  fn: () => Promise<T>,
  message = "Internal Server Error"
): Promise<T> => {
  try {
    return await fn();
  } catch (err) {

    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(message, 500);
  }
};
