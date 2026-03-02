import type * as express from "express";
import { Usuario } from "src/generated/prisma/client";

declare global {
    namespace Express {
        export interface Request {
            user?: Usuario;
        }
    }
}