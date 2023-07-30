import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/list";
import { Profile } from "@/model/Profile";
import { ProfileIcon } from "./ProfileIcon";

export function ProfilesList({ profiles }: { profiles: Profile[] }) {
  return (
    <YStack fullscreen>
      <List
        data={profiles}
        renderItem={({ item }) => {
          return (
            <Link href={`/@${item.slug}`}>
              <ListItem
                title={item.name}
                subTitle={`@${item.slug}`}
                icon={<ProfileIcon profile={item} />}
                iconAfter={<ChevronRight size="$1.5" />}
              />
            </Link>
          );
        }}
      />
    </YStack>
  );
}
