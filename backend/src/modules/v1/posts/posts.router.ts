import { Hono } from "hono"
import likesRouter from "./likes/likes.router"
import commentsRouter from "./comments/comments.router"
const postsRouter = new Hono().basePath('/posts')

// posts routes
postsRouter.get('/', )
postsRouter.post('/', )
postsRouter.get('/:id', )
postsRouter.put('/:id', )
postsRouter.delete('/:id', )


//sub-router
postsRouter.route('/', likesRouter)
postsRouter.route('/', commentsRouter)


export default postsRouter