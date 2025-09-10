import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class CommonEntity {
    @CreateDateColumn({ type: "datetime" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "datetime" })
    deletedAt?: Date;
}
