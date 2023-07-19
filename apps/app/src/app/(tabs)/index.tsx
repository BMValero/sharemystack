import { MessageSquare } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, Text, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { sync } from "@/lib/sync";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <YStack>
        <H3 padding="$3">Welcome to Share My Stack</H3>
        <Text padding="$3" paddingTop="$0" fontSize="$6" lineHeight="$6">
          Curate your personal productivity stack to share it with the world and
          discover which tools others are using.
        </Text>
        <Button
          themeInverse
          margin="$3"
          onPress={() => router.push("/stacks/my")}
        >
          Go to my stack
        </Button>
        <Button
          themeInverse
          margin="$3"
          onPress={() => sync(true)}
          backgroundColor="$red10"
        >
          💣 Nuke DB
        </Button>
        <SuggestionButton text="Give Feedback" icon={<MessageSquare />} />
      </YStack>
    </SafeAreaView>
  );
}
