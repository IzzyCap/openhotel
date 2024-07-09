import { getRandomString } from "shared/utils/main.ts";
import { ConfigTypes, Envs } from "shared/types/main.ts";

export const getRequest = {
  method: "GET",
  pathname: "/request",
  fn: async (
    request: Request,
    config: ConfigTypes,
    envs: Envs,
    { userList, handshakeList, protocolToken },
  ): Promise<Response> => {
    const clientIPAddress: string = request.headers.get("host");
    const { searchParams } = new URL(request.url);
    const clientVersion = searchParams.get("version");

    if (handshakeList.length >= config.limits.handshakes)
      return Response.json(
        {
          error: 406,
          message: [
            "Cannot handshake right now",
            "Please try again in a few minutes",
          ],
        },
        { status: 406 },
      );

    if (clientVersion !== envs.version)
      return Response.json(
        {
          error: 406,
          message: [
            "Version mismatch",
            `Expected (${envs.version}) != ${clientVersion}`,
          ],
        },
        { status: 406 },
      );

    if (userList.length >= config.limits.players)
      return Response.json(
        {
          error: 406,
          message: ["Hotel is full", "Please try again in a few minutes"],
        },
        { status: 406 },
      );

    return Response.json(
      {
        session: getRandomString(32),
        token: protocolToken,
      },
      { status: 200 },
    );
  },
};