import { ProxyEvent } from "shared/enums/event.enum.ts";

export const PROXY_CLIENT_EVENT_WHITELIST: ProxyEvent[] = [
  ProxyEvent.JOIN_ROOM,
  ProxyEvent.LEAVE_ROOM,
  ProxyEvent.TEST,
  ProxyEvent.POINTER_TILE,
];