import { RefreshTokenDTO, SignInDTO, SignInResponseDTO, SignUpDTO } from "@/app/auth/auth.dto";
import { AuthService } from "@/app/auth/auth.service";
import { IsPublic } from "@/common/decorator/is-public.decorator";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@IsPublic()
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @core.TypedRoute.Post("sign-up")
    async signUp(@core.TypedBody() body: SignUpDTO): Promise<null> {
        await this.authService.signUp(body);
        return null;
    }

    @core.TypedRoute.Post("sign-in")
    async signIn(@core.TypedBody() body: SignInDTO): Promise<SignInResponseDTO> {
        return this.authService.signIn(body);
    }

    @core.TypedRoute.Post("token/refresh")
    async refresh(@core.TypedBody() body: RefreshTokenDTO): Promise<SignInResponseDTO> {
        return this.authService.refresh(body.refreshToken);
    }

    @core.TypedRoute.Post("sign-out")
    async signOut(@core.TypedBody() body: RefreshTokenDTO): Promise<null> {
        await this.authService.signOut(body.refreshToken);
        return null;
    }
}
