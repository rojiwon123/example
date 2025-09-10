import { User } from "@/app/user/user.type";

export interface GetProfileDTO {
    user: User;
}

export interface UpdateProfileDTO extends Pick<User, "name" | "profileUrl"> {}
