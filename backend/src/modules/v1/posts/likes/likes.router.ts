
import { Hono } from "hono"
const likesRouter = new Hono().basePath('/likes')

export default likesRouter