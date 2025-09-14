import { GetProfileDTO, UpdateProfileDTO } from "@/app/me/me.dto";
import { UserService } from "@/app/user/user.service";
import { User } from "@/app/user/user.type";
import { Viewer } from "@/common/decorator/viewer.decorator";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("me")
export class MeController {
    constructor(private readonly userService: UserService) {}

    /**
     * @summary 내정보 조회
     * @tag me
     * @security bearer
     */
    @core.TypedRoute.Get("profile")
    async getProfile(@Viewer() viewer: User): Promise<GetProfileDTO> {
        return { user: viewer };
    }

    /**
     * @summary 내 정보 수정
     * @tag me
     * @security bearer
     */
    @core.TypedRoute.Put("profile")
    async updateProfile(@Viewer() viewer: User, @core.TypedBody() body: UpdateProfileDTO): Promise<null> {
        await this.userService.upadateUser(viewer, body);
        return null;
    }
}
