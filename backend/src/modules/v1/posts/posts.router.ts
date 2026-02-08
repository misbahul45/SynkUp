import { Hono } from "hono"
import commentsRouter from "./comments/comments.router"
import { loginMiddleware } from "../../../middleware/auth.middleware"
import { validateBody, validateParams, validateQuery } from "../../../middleware/validate.middleware"
import { PostDTO } from "./index/index.dto"
import { createPostController, deletePostController, getPostByIdController, getPostsController, updatePostController } from "./index/index.controller"
const postsRouter = new Hono().basePath('/posts')

// posts routes
postsRouter.get('/', 
    validateQuery(PostDTO.query()),
    getPostsController
)
postsRouter.get('/:id', 
    validateParams(PostDTO.params()), 
    getPostByIdController
)
postsRouter.post('/',
    loginMiddleware,
    validateBody(PostDTO.create()),
    createPostController
)
postsRouter.patch('/:id', 
    loginMiddleware,
    validateParams(PostDTO.params()),
    validateBody(PostDTO.update()),
    updatePostController
)
postsRouter.delete('/:id', 
    loginMiddleware,
    validateParams(PostDTO.params()),
    deletePostController
)


//sub-router
postsRouter.route('/', commentsRouter)


export default postsRouter