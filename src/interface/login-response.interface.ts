import type { TUser } from "@/models";

export interface ILoginRes {
  backendTokens: {
    accessToken: string;
  };
  user: TUser;
}
