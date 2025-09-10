import { PublicUser, User, UserStatus } from "@/app/user/user.type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity({ name: "users" })
export class UserEntity extends CommonEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string;

    @Column({ name: "status", type: "varchar", length: 20 })
    status!: UserStatus;

    @Column({ type: "varchar", nullable: false })
    password!: string;

    @Column({ type: "varchar", nullable: false })
    email!: string;

    @Column({ type: "varchar", nullable: false })
    firstName!: string;

    @Column({ type: "varchar", nullable: false })
    lastName!: string;

    @Column({ type: "varchar", nullable: true })
    profileUrl!: string | null;

    toUser(): User {
        return {
            id: this.id,
            status: this.status,
            profileUrl: this.profileUrl,
            email: this.email,
            name: { first: this.firstName, last: this.lastName },
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
        };
    }

    toPublicUser(): PublicUser {
        return {
            id: this.id,
            status: this.status,
            profileUrl: this.profileUrl,
            name: { first: this.firstName, last: this.lastName },
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
        };
    }
}
