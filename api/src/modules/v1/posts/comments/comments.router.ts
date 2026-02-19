import { Hono } from "hono";
import { loginMiddleware } from "../../../../middleware/auth.middleware";
import { validateBody, validateParams, validateQuery } from "../../../../middleware/validate.middleware";
import { PostCommentDTO } from "./comments.dto";
import {
  createPostCommentController,
  deletePostCommentController,
  getPostCommentController,
  getPostCommentsController,
  updatePostCommentController,
} from "./comments.controller";

const commentsRouter = new Hono()

// Routes
commentsRouter.get(
  "/",
  validateQuery(PostCommentDTO.query()),
  getPostCommentsController
);

commentsRouter.get(
  "/:id",
  validateParams(PostCommentDTO.params()),
  getPostCommentController
);

commentsRouter.post(
  "/",
  loginMiddleware,
  validateBody(PostCommentDTO.create()),
  createPostCommentController
);

commentsRouter.patch(
  "/:id",
  loginMiddleware,
  validateParams(PostCommentDTO.params()),
  validateBody(PostCommentDTO.update()),
  updatePostCommentController
);

commentsRouter.delete(
  "/:id",
  loginMiddleware,
  validateParams(PostCommentDTO.params()),
  deletePostCommentController
);

export default commentsRouter;
