import { Hono } from "hono"
const commentsRouter = new Hono().basePath('/comments')

export default commentsRouter