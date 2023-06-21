import { YStack } from "tamagui";

import { List } from "../List";
import { SuggestionButton } from "../SuggestionButton";
import { ToolsResponse } from "../../lib/database/getTools";
import { ToolIcon } from "../icons/ToolIcon";

export function ToolList({
  tools,
  onPress,
}: {
  tools: ToolsResponse["data"];
  onPress?: (tool: string | null) => void;
}) {
  return (
    <YStack fullscreen>
      <List
        data={tools}
        href={!onPress ? (item) => `/tools/${item.slug}` : undefined}
        onPress={onPress ? (item) => onPress(item.id) : undefined}
        title={(item) => item.name}
        subTitle={(item) => item.website}
        icon={(item) => <ToolIcon svgXml={item.icon} width="24" height="24" />}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
