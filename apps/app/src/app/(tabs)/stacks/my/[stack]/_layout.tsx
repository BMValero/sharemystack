import { Share } from "@tamagui/lucide-icons";
import { Slot, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useFeatureFlag } from "posthog-react-native";
import { Button } from "tamagui";

import { List } from "@/components/list";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { PicksListItem } from "@/components/picks/PicksListItem";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function Layout() {
  const router = useRouter();
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();
  const { user } = useAuth();
  const { stack, picks } = useProfile({
    user,
    stackId,
  });
  const stackSharingFeature = useFeatureFlag("stack-sharing");

  return (
    <>
      <Stack.Screen
        options={{
          title: `${stack?.stackTypeName} Stack`,
          headerRight: () =>
            stackSharingFeature && (
              <Button
                icon={<Share size="$1.5" />}
                onPress={() => {
                  router.push(`/(tabs)/stacks/my/${stackId}/share`);
                }}
                unstyled
              />
            ),
        }}
      />
      <CustomSuspense
        data={stack}
        name="stack"
        component={(stack) => (
          <List
            data={picks}
            placeholder="You have not selected any tools for this stack"
            renderItem={({ item }) => (
              <PicksListItem stack={stack} pick={item} />
            )}
          />
        )}
      />
      <Slot />
    </>
  );
}
