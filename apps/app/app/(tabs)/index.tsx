import { SafeAreaView } from "react-native-safe-area-context";
import { H3, Text, YStack } from "tamagui";

export default function Index() {
  return (
    <SafeAreaView>
      <YStack padding="$3">
        <H3>Welcome to Share My Stack!</H3>
        <Text>
          This app is very much work in progress. I'm releasing it as a MVP
          (Minimum Viable Product). That means that it's not finished yet, but
          the very basic functionality is there and you can give it a try!
        </Text>
      </YStack>
    </SafeAreaView>
  );
}