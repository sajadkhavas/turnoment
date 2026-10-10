import { getDataAdapterMode } from "./data-adapter";
import { MockLoginAuthRepository } from "./login-auth-data";
import { ApiLoginAuthRepository } from "./login-auth-http-repository";
import type { LoginAuthRepository } from "./login-auth-contract";

export const loginAuthRepository: LoginAuthRepository =
  getDataAdapterMode() === "api"
    ? new ApiLoginAuthRepository()
    : new MockLoginAuthRepository();
