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

    }, 
    password: {
        hash: async (password:string) => {
            return await Bun.password.hash(password, {
                algorithm: "argon2id",
            });
        },
        verify: async (password:string, hash:string) => {
            return await Bun.password.verify(password, hash);
        },
    }

});


const authRouter = new Hono().basePath('/auth');

authRouter.on(["GET", "POST"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authRouter;
