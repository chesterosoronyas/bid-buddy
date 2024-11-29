import { createEnv } from "@t3-oss/env-nextjs";
import { create } from "domain";
import {z} from "zod";


export const env=createEnv({
    server:{
    DATABASE_URL:z.string().url(),
    NODE_ENV:z.string().min(1),
    },
    client:{

    },
    runtimeEnv:{
     DATABASE_URL:process.env.DATABASE_URL,
     NODE_ENV:process.env.NODE_ENV,
    }
})