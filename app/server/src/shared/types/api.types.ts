import { ConfigTypes } from "./config.types.ts";
import { Envs } from "./envs.types.ts";
import { WorkerParent } from "worker_ionic";
import { PrivateUser, UserMutable } from "./user.types.ts";

export type ApiRequestProps = {
  request: Request;
  config: ConfigTypes;
  envs: Envs;
  serverWorker: WorkerParent;
  userList: PrivateUser[];
};

type FuncProps = {
  data?: Record<string, string>;
  user?: UserMutable;
};

type Response = {
  status: number;
  data?: any;
};

export type ProxyRequestType = {
  pathname: string;
  func: (data: FuncProps) => Promise<Response> | Response;
};
