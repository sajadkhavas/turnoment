import { useSyncExternalStore } from "react";

// React uses the server snapshot during SSR and hydration. Keep native form
// controls inert until React can handle their events on the client.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydrated() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
