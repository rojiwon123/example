import { GetPublicUserDTO } from "@/app/user/user.dto";
import { UserService } from "@/app/user/user.service";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @core.TypedRoute.Get(":userId")
    async fineOne(@core.TypedParam("userId") userId: string): Promise<GetPublicUserDTO> {
        const user = await this.userService.getUser({ userId });
        return { user };
    }
}
