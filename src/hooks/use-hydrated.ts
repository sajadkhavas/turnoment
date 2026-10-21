import { useSyncExternalStore } from "react";

// Keep SSR form controls inert until React hydrates and can handle submissions.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydrated() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
