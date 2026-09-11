import { MockLoginAuthRepository } from "./login-auth-data";
import { DjangoLoginAuthRepository } from "./login-auth-http-repository";
import type { LoginAuthRepository } from "./login-auth-contract";

export const loginAuthRepository: LoginAuthRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoLoginAuthRepository()
    : new MockLoginAuthRepository();
