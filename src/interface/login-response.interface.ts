import type { TUser } from "@/models";

export interface ILoginResponse {
  backendTokens: {
    accessToken: string;
  };
  user: TUser;
}
