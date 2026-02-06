import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../../../databases/init";
import { Hono } from "hono";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
    }),
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none", 
            secure: true,
        },
    },
    emailAndPassword: { 
        enabled: true, 
    }, 
    socialProviders: { 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    }, 
});


const authRouter = new Hono().basePath('/auth');

authRouter.on(["GET", "POST"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authRouter;
