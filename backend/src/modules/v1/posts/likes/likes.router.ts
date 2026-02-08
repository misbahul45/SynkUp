import { Hono } from "hono";
import { loginMiddleware } from "../../../../middleware/auth.middleware";
import { validateQuery } from "../../../../middleware/validate.middleware";
import { LikeDTO } from "./likes.dto";
import { createLikeController, deleteLikeController } from "./likes.controller";

const likesRouter=new Hono()

likesRouter.post('/like', loginMiddleware, validateQuery(LikeDTO.query()), createLikeController) 
likesRouter.delete('/unlike', loginMiddleware, validateQuery(LikeDTO.query()), deleteLikeController)

export default likesRouter;