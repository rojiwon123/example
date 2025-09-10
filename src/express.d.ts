import { User } from "./app/user/domain/user.type";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
