import { Hono } from "hono";
import { loginMiddleware } from "../../../middleware/auth.middleware";
import { validateBody, validateParams } from "../../../middleware/validate.middleware";
import { ProfileDTO } from "./profile.dto";
import {
  createProfileController,
  deleteProfileController,
  getProfileController,
  updateProfileController,
} from "./profile.controller";

const profileRouter = new Hono().basePath("/profiles");

profileRouter.post(
  "/",
  loginMiddleware,
  validateBody(ProfileDTO.create()),
  createProfileController
);

profileRouter.get(
  "/:id",
  loginMiddleware,
  validateParams(ProfileDTO.params()),
  getProfileController
);

profileRouter.patch(
  "/:id",
  loginMiddleware,
  validateParams(ProfileDTO.params()),
  validateBody(ProfileDTO.update()),
  updateProfileController
);

profileRouter.delete(
  "/:id",
  loginMiddleware,
  validateParams(ProfileDTO.params()),
  deleteProfileController
);

export default profileRouter;
