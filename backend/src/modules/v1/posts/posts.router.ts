import { Hono } from "hono"
import commentsRouter from "./comments/comments.router"
import { loginMiddleware } from "../../../middleware/auth.middleware"
import { validateBody, validateParams, validateQuery } from "../../../middleware/validate.middleware"
import { PostDTO } from "./index/index.dto"
import { createPostController, deletePostController, getPostByIdController, getPostsController, updatePostController } from "./index/index.controller"
import likesRouter from "./likes/likes.router"
const postsRouter = new Hono().basePath('/posts')

//sub-router
postsRouter.route('/comments', commentsRouter)
postsRouter.route('/', likesRouter)

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




export default postsRouter