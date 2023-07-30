import { ChevronRight, Plus } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { H5, ListItem } from "tamagui";

import { CategoryIcon } from "../categories/CategoryIcon";
import { List } from "../list";

import { useStackTypes } from "@/hooks/data/useStackTypes";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";
import { StackType } from "@/model/StackType";

export function MyStacks({
  profile,
  stacks,
}: {
  profile: Profile;
  stacks: Stack[];
}) {
  const { stackTypes } = useStackTypes();
  const router = useRouter();

  function handleCreateStack(stackType: StackType) {
    console.log("Create stack", stackType.name);
    profile.addStack(stackType);
  }

  return (
    <>
      {stacks.length > 0 && (
        <>
          <H5 paddingHorizontal="$3" marginBottom="$3">
            My stacks
          </H5>
          <List
            data={stacks}
            renderItem={({ item }) => {
              return (
                <ListItem
                  onPress={() =>
                    router.push(`/stacks/my/${item.stackTypeSlug}`)
                  }
                  title={item.stackTypeName}
                  icon={
                    <CategoryIcon name={item.stackTypeIconName} size="$1.5" />
                  }
                  iconAfter={<ChevronRight size="$1.5" />}
                />
              );
            }}
          />
        </>
      )}
      <H5 paddingHorizontal="$3" marginBottom="$3">
        {stacks.length > 0
          ? "Add a new stack to your profile"
          : "Create your first stack now"}
      </H5>
      <List
        data={stackTypes}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => handleCreateStack(item)}
            title={item.name}
            icon={<CategoryIcon name={item.iconName} size="$1.5" />}
            iconAfter={<Plus size="$1.5" />}
          />
        )}
      />
    </>
  );
}
