import { ChevronRight } from "@tamagui/lucide-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ListItem, Text, YStack } from "tamagui";

import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { List } from "@/components/list";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/data/useProfile";
import { useStackType } from "@/hooks/data/useStackType";

export default function Index() {
  const { stackType: slug } = useLocalSearchParams<{
    stackType: string;
  }>();

  if (!slug) throw new Error("No stack type slug provided");

  const { stackType, categories } = useStackType({ slug });
  const { user } = useAuth();

  const { stack } = useProfile({ user, stackTypeSlug: slug });
  const title = `Categories (${stack?.stackTypeName})`;

  return (
    <>
      <Stack.Screen options={{ title }} />
      <YStack fullscreen minHeight={100}>
        <List
          data={categories}
          renderItem={({ item }) => {
            return item.isComingSoon ? null : (
              <Link href={`/(tabs)/stacks/my/${slug}/picks/${item.slug}`}>
                <ListItem
                  title={
                    item.isComingSoon ? (
                      <Text color="$gray8">{item.name}</Text>
                    ) : (
                      item.name
                    )
                  }
                  subTitle={
                    item.isComingSoon ? (
                      <Text color="$gray8">Coming soon</Text>
                    ) : (
                      `${item.numberOfTools ?? "0"} tool${
                        item.numberOfTools !== 1 ? "s" : ""
                      }`
                    )
                  }
                  icon={
                    <CategoryIcon
                      name={item.iconName}
                      color={item.isComingSoon ? "$gray8" : undefined}
                      size={"$1.5"}
                    />
                  }
                  iconAfter={<ChevronRight size="$1.5" />}
                />
              </Link>
            );
          }}
        />
      </YStack>
    </>
  );
}
