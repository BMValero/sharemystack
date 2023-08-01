import { ChevronRight } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { List } from "../list";
import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { usePicks } from "@/hooks/data/usePicks";

export function Stream() {
  const { picks } = usePicks();
  const router = useRouter();

  return (
    <List
      data={picks}
      renderItem={({ item }) => {
        return (
          <ListItem
            title={`${item.profileName} (@${item.profileSlug})`}
            subTitle={`added ${item.toolName} to their ${item.stackTypeName} stack`}
            onPress={() =>
              router.push(`/@${item.profileSlug}/${item.stack.id}`)
            }
            icon={
              <CustomSuspense
                promise={item.tool.fetch()}
                name="tool"
                component={(tool) => <ToolIcon tool={tool} size="$1.5" />}
              />
            }
            iconAfter={<ChevronRight size="$1.5" />}
          />
        );
      }}
    />
  );
}
