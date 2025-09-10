import { Entity } from "@/common/entity";
import { OmitKeyof } from "@/common/util/omit.type";
import typia from "typia";

export type UserStatus = "pending" | "active" | "inactive";

export interface User extends Entity {
    status: UserStatus;
    profileUrl: string | null;
    email: string & typia.tags.Format<"email">;
    name: { first: string; last: string };
}

export interface PublicUser extends OmitKeyof<User, "email"> {}
