import { Link } from "expo-router";
import { ListItem, Text, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { List } from "@/components/list";
import { useObservableCategories } from "@/hooks/useObservableCategories";
import { ChevronRight } from "@tamagui/lucide-icons";

export default function Categories() {
  const categories = useObservableCategories({ includeComingSoon: true });

  return (
    <YStack fullscreen>
      <List
        data={categories}
        renderItem={({ item }) => {
          return (
            <Link
              href={
                item.isComingSoon ? "/categories" : `/categories/${item.slug}`
              }
            >
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
                    name={item.icon}
                    color={item.isComingSoon ? "$gray8" : undefined}
                  />
                }
                iconAfter={
                  item.isComingSoon ? undefined : <ChevronRight size="$1" />
                }
              />
            </Link>
          );
        }}
      />
      <SuggestionButton suggestion="category" />
    </YStack>
  );
}
