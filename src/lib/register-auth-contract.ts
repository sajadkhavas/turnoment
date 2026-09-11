import { sanitizeLoginRedirect } from "./login-auth-contract";

export function sanitizeRegisterRedirect(value: unknown) {
  const candidate = sanitizeLoginRedirect(value);

  try {
    const url = new URL(candidate, "https://turnoment.invalid");
    if (url.pathname === "/register" || url.pathname === "/register/") return "/dashboard";
    return candidate;
  } catch {
    return "/dashboard";
  }
}
