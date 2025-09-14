import { RefreshTokenDTO, SignInDTO, SignInResponseDTO, SignUpDTO } from "@/app/auth/auth.dto";
import { AuthService } from "@/app/auth/auth.service";
import { IsPublic } from "@/common/decorator/is-public.decorator";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@IsPublic()
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * @summary 회원가입
     * @tag auth
     * @param body 회원가입 정보
     */
    @core.TypedRoute.Post("sign-up")
    async signUp(@core.TypedBody() body: SignUpDTO): Promise<null> {
        await this.authService.signUp(body);
        return null;
    }

    /**
     * @summary 로그인
     * @tag auth
     * @param body 로그인 정보
     * @return 로그인 토큰
     */
    @core.TypedRoute.Post("sign-in")
    async signIn(@core.TypedBody() body: SignInDTO): Promise<SignInResponseDTO> {
        return this.authService.signIn(body);
    }

    /**
     * 갱신 토큰을 새로 발급합니다.
     *
     * @summary 토큰 갱신
     * @tag auth
     * @param body 갱신 토큰
     * @return 로그인 토큰
     */
    @core.TypedRoute.Post("token/refresh")
    async refresh(@core.TypedBody() body: RefreshTokenDTO): Promise<SignInResponseDTO> {
        return this.authService.refresh(body.refreshToken);
    }

    /**
     * 갱신 토큰을 비활성화합니다.
     *
     * @summary 로그아웃
     * @tag auth
     * @param body 갱신 토큰
     */
    @core.TypedRoute.Post("sign-out")
    async signOut(@core.TypedBody() body: RefreshTokenDTO): Promise<null> {
        await this.authService.signOut(body.refreshToken);
        return null;
    }
}
