import { Hono } from 'hono'
import { cors } from 'hono/cors';
import profileRouter from './modules/v1/profile/profile.router';
import docsRouter from './modules/v1/docs/docs.router.';
import postsRouter from './modules/v1/posts/posts.router';
import { auth } from './modules/v1/auth';
import { AppError } from './lib/error';

export const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null
	}
}>().basePath(`/api/${Bun.env.API_VERSION || 'v1'}`)


app.use(
  "/auth/*",
  cors({
    origin: Bun.env.BETTER_AUTH_URL || 'http://localhost:3000',
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
)


app.use("*", async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    c.set("user", null)
    c.set("session", null)
  } else {
    c.set("user", session.user)
    c.set("session", session.session)
  }

  await next()
})

app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        message: err.message,
      },
      err.statusCode
    );
  }

  console.error(err);

  return c.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    500
  );
});

//routes
app.get('/health', (c) => {
  return c.json({ message: 'Server is healthy!' })
})


app.on(["GET", "POST"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});


app.get("/me", (c) => {
  const user = c.get("user")
  if (!user) return c.json({ error: "Unauthorized" }, 401)
  return c.json(user)
})


app.route('/', profileRouter)
app.route('/', docsRouter)
app.route('/', postsRouter)


export default app
