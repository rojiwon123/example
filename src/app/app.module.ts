import { InfraModule } from "@/infrastructure/infra.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

const modules = [InfraModule, AuthModule, UserModule];

@Module({ imports: modules, exports: modules })
export class AppModule {}
