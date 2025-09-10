import typia from "typia";

export interface SignUpDTO {
    email: string & typia.tags.Format<"email">;
    profileUrl: (string & typia.tags.Format<"uri">) | null;
    password: string;
    firstName: string;
    lastName: string;
}

export interface SignInDTO {
    email: string & typia.tags.Format<"email">;
    password: string;
}

export interface TokenDTO {
    token: string;
    expiredAt: string & typia.tags.Format<"date-time">;
}

export interface SignInResponseDTO {
    accessToken: TokenDTO;
    refreshToken: TokenDTO;
}

export interface RefreshTokenDTO {
    refreshToken: string;
}
