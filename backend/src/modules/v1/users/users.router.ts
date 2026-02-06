import { Hono } from "hono"
const userRouter = new Hono().basePath('/users')


userRouter.get('/', (c) => {
  return c.json({ message: 'User route' })
})

userRouter.post('/', (c) => {
  return c.json({ message: 'Create user' })
})

userRouter.get('/:id', (c) => {
  const { id } = c.req.param()
  return c.json({ message: `Get user with ID: ${id}` })
})

userRouter.put('/:id', (c) => {
  const { id } = c.req.param()
  return c.json({ message: `Update user with ID: ${id}` })
})

userRouter.delete('/:id', (c) => {
  const { id } = c.req.param()
  return c.json({ message: `Delete user with ID: ${id}` })
})
export default userRouter