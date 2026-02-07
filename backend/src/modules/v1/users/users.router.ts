import { Hono } from "hono"
import { loginMiddleware } from "../../../middleware/auth.middleware"
import { createUserController, deleteUserController, getAllUserController, geUserController, updateUserController } from "./users.controller"
import { validateBody, validateParams, validateQuery } from "../../../middleware/validate.middleware"
import { UserDTO } from "./users.dto"

const userRouter = new Hono().basePath('/users')

userRouter.get('/', validateQuery(UserDTO.querySearch()),getAllUserController) 
userRouter.post('/', validateBody(UserDTO.create()),loginMiddleware, createUserController)
userRouter.get('/:id', validateParams(UserDTO.params()),loginMiddleware, geUserController)
userRouter.patch('/:id',validateParams(UserDTO.params()),validateBody(UserDTO.update()),loginMiddleware, updateUserController)
userRouter.delete('/:id',validateParams(UserDTO.params()),loginMiddleware, deleteUserController)

  export default userRouter