import { X } from "@tamagui/lucide-icons";
import { Stack, useRouter } from "expo-router";
import { Button } from "tamagui";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Button
            icon={<X size="$1.5" />}
            onPress={() => {
              router.back();
            }}
            unstyled
            color="$gray10"
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Share my profile" }} />
      <Stack.Screen name="[stack]" options={{ title: "Share my stack" }} />
    </Stack>
  );
}