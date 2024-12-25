import { Command } from "shared/types/main.ts";
import { System } from "modules/system/main.ts";
import { ProxyEvent } from "shared/enums/event.enum.ts";
import { __ } from "shared/utils/languages.utils.ts";

export const teleportCommand: Command = {
  command: "teleport",
  func: async ({ user, args }) => {
    const [type, ...moreArgs] = args as string[];

    const [teleportIdA, teleportIdB] = moreArgs as string[];
    const teleportA = System.game.teleports.get(teleportIdA);
    if (!teleportA) return;

    switch (type) {
      case "link":
        const teleportB = System.game.teleports.get(teleportIdB);
        if (!teleportB) return;

        await System.game.teleports.setLink(teleportIdA, teleportIdB);
        break;
      case "remote":
        if (!System.getConfig().onet.enabled) return;

        const [, $linkId] = moreArgs as string[];

        const { linkId } = await System.game.teleports.remote.setLink(
          user.getAccountId(),
          user.getRoom(),
          teleportIdA,
          $linkId ?? undefined,
        );

        user.emit(ProxyEvent.SYSTEM_MESSAGE, {
          message: `link id on console... (${linkId})`,
        });
        break;
    }
  },
};