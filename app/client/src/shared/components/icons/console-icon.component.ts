import { ContainerComponent, sprite } from "@tu/tulip";
import { SpriteSheetEnum } from "shared/enums";
import { baseIconComponent } from "./base-icon.component";

type Props = {};

export const consoleIconComponent: ContainerComponent<Props> = ({
  ...props
}) => {
  const $container = baseIconComponent({
    ...props,
    size: 23,
  });

  const icon = sprite({
    spriteSheet: SpriteSheetEnum.UI,
    texture: "console",
    position: {
      x: 4,
      y: 0,
    },
  });
  $container.add(icon);

  return $container.getComponent(consoleIconComponent);
};