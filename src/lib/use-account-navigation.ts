import { useQuery } from "@tanstack/react-query";
import { playerSessionRepository } from "./player-session";

export function useNavigationSession(freshOnMount = false) {
  return useQuery({
    queryKey: ["tournomatch", "navigation-session"],
    queryFn: () => playerSessionRepository.getSession(),
    staleTime: 30_000,
    refetchOnWindowFocus: "always",
    retry: false,
    refetchOnMount: freshOnMount ? "always" : true,
  });
}

export function useAccountNavigation() {
  const session = useNavigationSession();
  return session.isSuccess && session.data.state === "authenticated"
    ? { to: "/dashboard/profile" as const, search: {}, label: "پروفایل من" }
    : { to: "/login" as const, search: { redirect: "/dashboard/profile" }, label: "ورود" };
}
