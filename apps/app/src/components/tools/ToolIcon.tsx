import { Token, getTokenValue, useTheme } from "@tamagui/core";
import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";
import { Spinner } from "tamagui";

import { CustomSuspense } from "../loading/CustomSuspense";

import { Tool } from "@/model/Tool";

export function ToolIcon({
  tool,
  size,
}: {
  tool: Tool;
  size?: Token | number;
}) {
  const theme = useTheme();
  const color = tool.color?.length ? tool.color : theme.color.val;
  const width = size
    ? typeof size === "number"
      ? size
      : getTokenValue(size, "size")
    : "100%";

  return tool.toolIcon?.id ? (
    <CustomSuspense
      promise={tool.toolIcon.fetch()}
      fallback={<Spinner width={width} height={width} />}
      component={(icon) => (
        <SvgXml xml={icon.iconSvg} color={color} width={width} height={width} />
      )}
    />
  ) : (
    <BoxSelect color={color} size={width} />
  );
}
