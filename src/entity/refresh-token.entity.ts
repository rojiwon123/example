import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity({ name: "refresh_tokens" })
export class RefreshTokenEntity extends CommonEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string;

    @Column({ type: "bigint", name: "user_id" })
    userId!: string;

    @Column({ type: "datetime", name: "expired_at" })
    expiredAt!: Date;
}
