import type { User } from "@/app/user/user.type";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
