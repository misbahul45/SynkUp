import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../../../databases/init";
import { openAPI } from "better-auth/plugins"
import * as schema from "../../../databases/repository/auth";

export const auth = betterAuth({
    basePath:'/api/v1/auth',
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema
    }),
    plugins: [
        openAPI()
    ],
    advanced: {
        defaultCookieAttributes: {
            sameSite: "lax",//production use 'none' 
            secure: false, //production true
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


